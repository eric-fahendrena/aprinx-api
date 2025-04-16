import pool from "../db/pool.js";

/**
 * Inserts transaction to course_transactions table
 * 
 * @param {object} tData 
 * @returns {object} the created transaction
 */
export const insertTransaction = async (tData) => {
  const query = "INSERT INTO course_transactions(course_id, buyer_id, screenshot_url, status, date) VALUES($1, $2, $3, $4, $5) RETURNING *";
  const result = await pool.query(query, [
    tData.courseId,
    tData.buyerId,
    tData.screenshotUrl,
    "PENDING",
    Date.now(),
  ]);
  return result.rows[0];
}

/**
 * Selects a list of transactions by course author id
 * 
 * @param {number} cAuthorId 
 * @param {*} offset 
 * @param {*} limit 
 * @returns {Array<object>}
 */
export const selectTransactionsByCourseAuthor = async (cAuthorId, offset, limit) => {
  const query = "SELECT course_transactions.*, courses.price AS amount, courses.title AS course_title, courses.author_id AS course_author_id, users.name AS buyer_name FROM course_transactions INNER JOIN courses ON courses.id = course_transactions.course_id INNER JOIN users ON users.id = course_transactions.buyer_id WHERE courses.author_id = $1 AND course_transactions.status = 'PENDING' OFFSET $2 LIMIT $3";
  const result = await pool.query(query, [ cAuthorId, offset, limit ]);
  return result.rows;
}

/**
 * Selects the total of transactions by course author id
 * 
 * @param {number} cAuthorId 
 * @returns the total of transactions
 */
export const selectTransactionCountByCourseAuthor = async (cAuthorId) => {
  const query = "SELECT COUNT(course_transactions.*) AS total FROM course_transactions INNER JOIN courses ON courses.id = course_transactions.course_id WHERE courses.author_id = $1 AND course_transactions.status = 'PENDING'";
  const result = await pool.query(query, [ cAuthorId ]);
  return result.rows[0].total;
}

/**
 * Updates transaction status
 * 
 * @param {number} transId 
 * @param {string} status 
 * @returns the updated transaction
 */
export const updateTransactionStatus = async (transId, status) => {
  const query = "UPDATE course_transactions SET status = $1 WHERE id = $2 RETURNING *";
  const result = await pool.query(query, [ status, transId ]);
  return result.rows[0];
}

/**
 * Selects course transaction
 * 
 * @param {object} tData 
 * @returns 
 */
export const selectTransaction = async (tData) => {
  const query = "SELECT course_transactions.*, users.name AS buyer_name, users.picture AS buyer_picture FROM course_transactions INNER JOIN users ON users.id = course_transactions.buyer_id INNER JOIN courses ON courses.id = course_transactions.course_id WHERE courses.author_id = $1 AND trans_id = $2";
  const result = await pool.query(query, [
    tData.course_author_id,
    tData.trans_id,
  ]);
  return result.rows[0];
}

/**
 * Selects latest transaction by author id
 * 
 * @param {number} authorId 
 * @param {number} buyerId 
 * @returns 
 */
export const selectLatestTransByAuthorId = async (authorId, buyerId) => {
  const query = "SELECT * FROM course_transactions WHERE author_id = $1 AND buyer_id = $2 ORDER BY id DESC";
  const result = await pool.query(query, [ authorId, buyerId ]);
  return result.rows[0];
}
