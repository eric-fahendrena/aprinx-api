import fetch from "node-fetch";

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

  console.log(await tokenInfoResponse.json());
};
