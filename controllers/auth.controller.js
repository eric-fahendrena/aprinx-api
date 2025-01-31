import fetch from "node-fetch";
import pg from "pg";
import * as userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const { Pool } = pg;

const GOOGLE_CALLBACK_URL = "http://localhost:8000/api/auth/google/callback";
const GOOGLE_OAUTH_SCOPES = [
  "https%3A//www.googleapis.com/auth/userinfo.email",
  "https%3A//www.googleapis.com/auth/userinfo.profile",  
];

/**
 * login with google
 * 
 * Redirect user to consent screen
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export const loginWithGoogle = async (req, res) => {
  const redirectToConsentScreen = () => {
    const state = "some_state";
    const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
    const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${process.env.GOOGLE_OAUTH_URL}?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_CALLBACK_URL)}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
    res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
  };
  redirectToConsentScreen();
};

/**
 * handle google response
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export const handleGoogleResponse = async (req, res) => {
  const { code } = req.query;
  const data = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_CALLBACK_URL,
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
    return await response.json();
  };
  const accessTokenData = await getAccessTokenData();
  // verify and extract the information in the id token
  const { id_token } = accessTokenData;
  const tokenInfoResponse = await fetch(`${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`);
  const userTokenInfo = await tokenInfoResponse.json();
  const savedUser = await saveUser(userTokenInfo);
  const jwtToken = generateToken({ id: savedUser.id });
  console.log(jwtToken);
  console.log("Saving to cookies...");
  res.cookie("jwt_token", jwtToken, {
    sameSite: "Strict",
    httpOnly: true,
    secure: true,
    maxAge: 3600000,
  });
  res.redirect(process.env.CLIENT_ORIGIN);
};

/**
 * send jwt_token
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export const sendJwtToken = (req, res) => {
  console.log("sending jwt token...");
  res.status(200).json({ jwt_token: req.cookies.jwt_token });
  console.log("jwt token received !");
}

/**
 * save user
 * 
 * @param {object} userData 
 * @returns {object} newUser
 */
async function saveUser(userData) {
  const user = await userModel.findByEmail(userData.email);
  if (!user){
    const newUser = await userModel.addUser(userData);
    console.log("New user", newUser);
    return newUser;
  }
  console.log("User with the same email already exists", user.email, user.id);
  return user;
}

/**
 * generate token
 * 
 * @param {object} data 
 * @returns {string}
 */
function generateToken(data) {
  const JWT_SECRET = process.env.JWT_SECRET;
  console.log("Generate token...");
  console.log("JWT_SECRET", JWT_SECRET);
  const token = jwt.sign(data, JWT_SECRET, { expiresIn: 60 * 60 });
  return token;
}
