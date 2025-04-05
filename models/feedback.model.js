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
