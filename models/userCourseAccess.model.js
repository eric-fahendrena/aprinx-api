import pool from "../db/pool.js";

export const insertAccess = async (cId, uId) => {
  const query = "INSERT INTO user_course_access(course_id, user_id, date) VALUE($1, $2, $3) RETURNING *";
  const result = await pool(query, [ cId, uId, Date.now() ]);
  return result.rows[0];
}
