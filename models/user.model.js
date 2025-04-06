import pool from "../db/pool.js";

/**
 * add user to the table
 * 
 * @param {object} data 
 */
export const addUser = async (data) => {
  try {
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
}
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
  const query = "SELECT users.*, COUNT(DISTINCT courses.id) AS total_created_courses, COUNT(DISTINCT user_course_access.id) AS total_bought_courses FROM users LEFT JOIN courses ON users.id = courses.author_id LEFT JOIN user_course_access ON users.id = user_course_access.user_id WHERE users.id = $1 GROUP BY users.id";
  const result = await pool.query(query, [uId]);
  return result.rows[0];
}
/**
 * update phone number
 *  
 * @param {Number} uId 
 * @returns 
 */
export const updateUserPhoneNumber = async (uId, data) => {
  console.log(data)
  const query = "UPDATE users SET phone_number = $1, phone_number_associated_name = $2 WHERE id = $3 RETURNING *";
  const result = await pool.query(query, [data.phone_number, data.phone_number_associated_name, uId]);
  return result.rows[0];
}
/**
 * Selects user role
 * 
 * @param {number} uId 
 * @returns 
 */
export const selectUserRole = async (uId) => {
  const query = "SELECT role FROM users WHERE id = $1";
  const result = await pool.query(query, [ uId ]);
  return result.rows[0];
}

export const selectAllUsers = async (offset, limit) => {
  const query = "SELECT * FROM users ORDER BY id DESC OFFSET $1 LIMIT $2";
  const result = await pool.query(query, [ offset, limit ]);
  return result.rows;
}

export const updateUserRoleToTeacher = async (userId) => {
  const query = "UPDATE users SET role = 'TEACHER' WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [ userId ]);
  return result.rows[0];
}

export const selectCreatedCourses = async (userId, offset, limit) => {
  const query = "SELECT * FROM courses WHERE author_id = $1 ORDER BY id DESC OFFSET $2 LIMIT $3";
  const result = await pool.query(query, [ userId, offset, limit ]);
  return result.rows;
}
