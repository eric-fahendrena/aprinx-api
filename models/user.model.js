import pool from "../db/pool.js";

/**
 * add user to the table
 * 
 * @param {object} data 
 */
export const addUser = async (data) => {
  try {
    if (!data.name || !data.email || !data.picture || !data.given_name || !data.family_name || !data.email_verified)
      throw new Error("Invalid credential");
    const query = "INSERT INTO users(name, given_name, family_name, email, email_verified, picture) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
    const result = await pool.query(query, [
      data.name,
      data.given_name,
      data.family_name,
      data.email,
      data.email_verified,
      data.picture,
    ]);

    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
};
/**
 * find user by email
 * 
 * @param {string} email 
 * @returns 
 */
export const findByEmail = async (email) => {
  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    
    if (!result.rows[0])
      return false;
  
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
}
/**
 * find user by id
 * 
 * @param {number} uId 
 * @returns 
 */
export const findById = async (uId) => {
  const query = "SELECT * FROM users WHERE id = $1";
  const result = await pool.query(query, [uId]);
  return result.rows[0];
}
