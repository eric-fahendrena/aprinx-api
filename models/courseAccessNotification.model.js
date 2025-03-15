import pool from "../db/pool.js";

export const insertCourseAccessNotification = async (notifData) => {
  const query = "INSERT INTO course_access_notifications(user_id, course_id, author_names, is_read, date, last_update) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
  const result = await pool.query(query, [
    notifData.userId,
    notifData.courseId,
    notifData.authorNames,
    false,
    Date.now(),
    Date.now(),
  ]);
  return result.rows[0];
}

export const selectCourseAccessNotification = async (courseId, userId) => {
  const query = "SELECT * FROM course_access_notifications WHERE course_id = $1 AND user_id = $2";
  const result = await pool.query(query, [ courseId, userId ]);
  return result.rows[0];
}
