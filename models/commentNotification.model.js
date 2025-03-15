import pool from "../db/pool.js";

export const insertCommentNotification = async (notifData) => {
  const query = "INSERT INTO comment_notifications(user_id, course_id, author_names, is_read, date, last_update) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
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

export const selectCommentNotificationByCourseId = async (courseId) => {
  const query = "SELECT * FROM comment_notifications WHERE course_id = $1";
  const result = await pool.query(query, [ courseId ]);
  return result.rows[0];
}

export const updateCommentNotificationAuthorNames = async (notifId, authorNames) => {
  const query = "UPDATE comment_notifications SET author_names = $1, is_read = $2, last_update = $3, is_seen = false WHERE id = $4 RETURNING *";
  const result = await pool.query(query, [ authorNames, false, Date.now(), notifId ]);
  return result.rows[0];
}

export const selectUnseenCommentNotifications = async (userId) => {
  const query = "SELECT * FROM comment_notifications WHERE user_id = $1 AND is_seen = false";
  const result = await pool.query(query, [ userId ]);
  return result.rows;
}

export const updateCommentNotificationsIsSeen = async (userId) => {
  const query = "UPDATE comment_notifications SET is_seen = true WHERE user_id = $1 RETURNING *";
  const result = await pool.query(query, [ userId ]);
  return result.rows;
}
