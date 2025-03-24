import pool from "../db/pool.js";

/**
 * Selects notification by course id
 * 
 * @param {number} courseId 
 * @param {string} type
 * @returns {object|undefined}
 */
export const selectNotificationByCourseId = async (courseId, type) => {
  const query = "SELECT * FROM notifications WHERE course_id = $1 AND type = $2";
  const result = await pool.query(query, [ courseId, type ]);
  return result.rows[0];
}

/**
 * Inserts notification to the table
 * 
 * @param {object} notifData 
 * @returns {object|undefined} the inserted notification
 */
export const insertNotification = async (notifData) => {
  const query = "INSERT INTO notifications (user_id, course_id, type, author_names, date, last_update) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
  const result = await pool.query(query, [
    notifData.userId,
    notifData.courseId,
    notifData.type,
    notifData.authorNames,
    Date.now(),
    Date.now(),
  ]);
  return result.rows[0];
}

/**
 * Updates notification author names
 * 
 * @param {number} notifId 
 * @param {string} authorNames 
 * @returns {object|undefined} the updated notification
 */
export const updateNotificationAuthorNames = async (notifId, authorNames) => {
  const query = "UPDATE notifications SET author_names = $1, last_update = $2, is_seen = false WHERE id = $3 RETURNING *";
  const result = await pool.query(query, [ authorNames, Date.now(), notifId ]);
  return result.rows[0];
}

export const selectNotificationsByUserId = async (uId, limit, offset) => {
  const query = "SELECT * FROM notifications WHERE user_id = $1 ORDER BY last_update";
  const result = await pool.query(query, [ uId ]);
  return result.rows;
}

export const selectUnseenNotificationsCount = async (uId) => {
  const query = "SELECT COUNT(*) AS total FROM notifications WHERE user_id = $1 AND is_seen = $2";
  const result = await pool.query(query, [ uId, false ]);
  return result.rows[0].total;
}

export const updateNotificationsIsSeenToTrue = async (uId) => {
  await pool.query("UPDATE notifications SET is_seen = true WHERE user_id = $1", [ uId ]);
  return true;
}
