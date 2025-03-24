import pool from "../db/pool.js";

export const selectTeacherSubscription = async (userId) => {
  const query = "SELECT * from teacher_subscriptions WHERE user_id = $1 ORDER BY id DESC";
  const result = await pool.query(query, [ userId ]);
  return result.rows[0];
}

export const insertTeacherSubscription = async (userId) => {
  const query = "INSERT INTO teacher_subscriptions(user_id, date) VALUES($1, $2) RETURNING *";
  const result = await pool.query(query, [ userId, Date.now() ]);
  return result.rows[0];
}

export const updateTeacherSubscriptionNextAmount = async (userId, nextAmount) => {
  const query = "UPDATE teacher_subscriptions SET next_payment_amount = $1 WHERE user_id = $2 RETURNING *";
  const result = await pool.query(query, [ nextAmount, userId ]);
  return result.rows[0];
}
