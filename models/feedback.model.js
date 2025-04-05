import pool from "../db/pool.js";

/**
 * Inserts feedback
 * 
 * @param {object} feedback 
 * @returns {object} the inserted feedback
 */
export const insertFeedback = async (feedback) => {
  const { authorId, message } = feedback;
  const query = "INSERT INTO feedbacks (author_id, message, date) VALUES($1, $2, $3) RETURNING *";
  const result = await pool.query(query, [ authorId, message, Date.now() ]);
  return result.rows[0];
}

/**
 * Selects all feedbacks
 * 
 * @param {number|string} offset 
 * @param {number|string} limit 
 * @returns 
 */
export const selectAllFeedbacks = async (offset, limit) => {
  const query = "SELECT feedbacks.*, users.name AS author_name, users.picture AS author_picture FROM feedbacks LEFT JOIN users ON users.id = feedbacks.author_id ORDER BY feedbacks.id DESC OFFSET $1 LIMIT $2";
  const result = await pool.query(query, [ offset, limit ]);
  return result.rows;
}
