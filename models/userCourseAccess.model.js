import pool from "../db/pool.js";

export const insertAccess = async (cId, uId) => {
  const query = "INSERT INTO user_course_access(course_id, user_id, date) VALUES($1, $2, $3) RETURNING *";
  const result = await pool.query(query, [ cId, uId, Date.now() ]);
  return result.rows[0];
}

export const selectAccess = async (cId, uId) => {
  const query = "SELECT * FROM user_course_access WHERE course_id = $1 AND user_id = $2";
  const result = await pool.query(query, [ cId, uId ]);
  return result.rows[0];
}
