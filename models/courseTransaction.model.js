import pool from "../db/pool.js";

export const insertTransaction = async (tData) => {
  const query = "INSERT INTO course_transactions(course_id, buyer_id, trans_id, trans_exp_name, status, date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
  const result = await pool.query(query, [
    tData.course_id,
    tData.buyer_id,
    tData.trans_id,
    tData.trans_exp_name,
    tData.status,
    Date.now(),
  ]);
  return result.rows[0];
}

export const selectTransaction = async (tData) => {
  const query = "SELECT course_transactions.*, users.name AS buyer_name, users.picture AS buyer_picture FROM course_transactions INNER JOIN users ON users.id = course_transactions.buyer_id INNER JOIN courses ON courses.id = course_transactions.course_id WHERE courses.author_id = $1 AND trans_id = $2";
  const result = await pool.query(query, [
    tData.course_author_id,
    tData.trans_id,
  ]);
  return result.rows[0];
}

export const updateTransactionStatus = async (transId, status) => {
  const query = "UPDATE course_transactions SET status = $1 WHERE trans_id = $2 RETURNING *";
  const result = await pool.query(query, [ status, transId ]);
  return result.rows[0];
}
