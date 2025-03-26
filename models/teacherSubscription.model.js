import pool from "../db/pool.js";

/**
 * Selects teacher subscription
 * 
 * @param {number} userId 
 * @returns 
 */
export const selectTeacherSubscription = async (userId) => {
  const query = "SELECT * from teacher_subscriptions WHERE user_id = $1 ORDER BY id DESC";
  const result = await pool.query(query, [ userId ]);
  return result.rows[0];
}

/**
 * Inserts teacher subscription
 * 
 * @param {number} userId 
 * @returns 
 */
export const insertTeacherSubscription = async (userId) => {
  const query = "INSERT INTO teacher_subscriptions(user_id, date) VALUES($1, $2) RETURNING *";
  const result = await pool.query(query, [ userId, Date.now() ]);
  return result.rows[0];
}

/**
 * Updates teacher subscription's next payment amount
 * 
 * @param {number} userId 
 * @param {number|string} nextAmount 
 * @returns 
 */
export const updateTeacherSubscriptionNextAmount = async (userId, nextAmount) => {
  const query = "UPDATE teacher_subscriptions SET next_payment_amount = $1 WHERE user_id = $2 RETURNING *";
  const result = await pool.query(query, [ nextAmount, userId ]);
  return result.rows[0];
}

/**
 * Selects only date from teacher subscription
 * 
 * @param {number} userId 
 * @returns {string}
 */
export const selectTeacherSubscriptionDate = async (userId) => {
  const query = "SELECT date FROM teacher_subscriptions WHERE user_id = $1 ORDER BY id DESC";
  const result = await pool.query(query, [ userId ]);
  return result.rows[0].date;
}
