import fetch from "node-fetch";
import * as userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const GOOGLE_OAUTH_SCOPES = [
  "https%3A//www.googleapis.com/auth/userinfo.email",
  "https%3A//www.googleapis.com/auth/userinfo.profile",
];

/**
 * login with google
 * 
 * Redirects user to consent screen
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
export const loginWithGoogle = async (req, res) => {
  console.log("Login with google");
  const redirectToConsentScreen = () => {
    console.log("Consent screen !");
    const state = "some_state";
    const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
    const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${process.env.GOOGLE_OAUTH_URL}?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.GOOGLE_CALLBACK_URL)}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
    console.log("Redirection to ", GOOGLE_OAUTH_CONSENT_SCREEN_URL);
    res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
  };
  redirectToConsentScreen();
};

/**
 * handles google response
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
export const handleGoogleResponse = async (req, res) => {
  const { code } = req.query;
  const data = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
    grant_type: "authorization_code",
  };
  /**
   * Exchange authorization code for access token and id_token
   * 
   * @returns {Object} access token
   */
  const getAccessTokenData = async () => {
    const response = await fetch(process.env.GOOGLE_ACCESS_TOKEN_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const data = await response.json();
    return data;
  };
  
  console.log("Getting access token data...");
  const accessTokenData = await getAccessTokenData();
  console.log("Access token data", accessTokenData);

  // verify and extract the information in the id token
  console.log("Extracting user information in the id token");
  const { id_token } = accessTokenData;
  console.log("id_token :", id_token);
  const tokenInfoResponse = await fetch(`${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`);
  const userTokenInfo = await tokenInfoResponse.json();
  console.log("User token info :", userTokenInfo);
  const savedUser = await saveUser(userTokenInfo);
  console.log("Connecting user :", savedUser);
  
  console.log("Generating token...");
  const jwtToken = generateToken({ id: savedUser.id, role: savedUser.role });
  console.log("JWT Token :", jwtToken);

  console.log("Saving jwt token to cookies...");
  res.cookie("jwt_token", jwtToken, {
    sameSite: "none",
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24,
  });
  console.log("Ok, Redirecting to home...");
  res.redirect(301, process.env.CLIENT_ORIGIN);
};

export const logout = (req, res) => {
  console.log("Logout...");
  req.session.destroy(() => {
    res.clearCookie('jwt_token');
    console.log("Redirecting to home...");
    res.redirect(process.env.CLIENT_ORIGIN)
  });
}

/**
 * Sends jwt_token
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export const sendJwtToken = (req, res) => {
  try {
    console.log("sending jwt token");
    res.status(200).json({ jwt_token: req.cookies.jwt_token });
    console.log("jwt token received !");
  } catch (error) {
    console.error("Error", error);
  }
}

/**
 * saves user
 * 
 * @param {object} userData 
 * @returns {object} newUser
 */
async function saveUser(userData) {
  console.log("Verifying if user already exists...");
  const user = await userModel.findByEmail(userData.email);
  if (!user){
    console.log("User does not exist !");
    console.log("Creating new user...");
    const newUser = await userModel.addUser(userData);
    console.log("New user :", newUser);
    return newUser;
  }
  console.log("User with the same email already exists !", user.email, user.id);
  console.log("Let's continue");
  return user;
}

/**
 * generates token
 * 
 * @param {object} data 
 * @returns {string}
 */
function generateToken(data) {
  const JWT_SECRET = process.env.JWT_SECRET;
  console.log("Generate token");
  const token = jwt.sign(data, JWT_SECRET, { expiresIn: 24 * 60 * 60 });
  return token;
}
