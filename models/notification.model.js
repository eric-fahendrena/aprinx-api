import pool from "../db/pool.js";

export const selectNotificationsByUserId = async (uId, limit, offset) => {
  const query = "SELECT * FROM view_notifications WHERE user_id = $1 ORDER BY last_update";
  const result = await pool.query(query, [ uId ]);
  return result.rows;
}

export const selectUnseenNotificationsCount = async (uId) => {
  const query = "SELECT COUNT(*) AS total FROM view_notifications WHERE user_id = $1 AND is_seen = $2";
  const result = await pool.query(query, [ uId, false ]);
  return result.rows[0].total;
}

export const updateNotificationsIsSeenToTrue = async (uId) => {
  await pool.query("BEGIN");
  
  await pool.query("UPDATE comment_notifications SET is_seen = true WHERE user_id = $1", [ uId ]);
  await pool.query("UPDATE like_notifications SET is_seen = true WHERE user_id = $1", [ uId ]);
  await pool.query("UPDATE course_access_notifications SET is_seen = true WHERE user_id = $1", [ uId ]);
  
  await pool.query("COMMIT");

  return true;
}
