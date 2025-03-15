import pool from "../db/pool.js";

export const insertCourseLike = async (likeData) => {
  const query = "INSERT INTO course_likes(course_id, user_id, date) VALUES($1, $2, $3) RETURNING *";
  const result = await pool.query(query, [
    likeData.course_id,
    likeData.user_id,
    Date.now(),
  ]);
  return result.rows[0];
}

export const deleteCourseLike = async (data) => {
  const query = "DELETE FROM course_likes WHERE course_id = $1 AND user_id = $2 RETURNING *";
  const result = await pool.query(query, [
    data.course_id,
    data.user_id,
  ]);
  return result.rows[0];
}

export const selectCourseLike = async (data) => {
  const query = "SELECT * FROM course_likes WHERE course_id = $1 AND user_id = $2";
  const result = await pool.query(query, [ data.course_id, data.user_id ]);
  return result.rows[0];
}

export const selectCourseLikesCount = async (cId) => {
  const query = "SELECT COUNT(*) AS total FROM course_likes WHERE course_id = $1";
  const result = await pool.query(query, [ cId ]);
  return result.rows[0].total;
}
