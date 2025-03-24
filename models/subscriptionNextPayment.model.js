import pool from "../db/pool.js";

export const insertNextPayment = async (userId, amount) => {
  const query = "INSERT INTO subscription_next_payments (user_id, amount, date, updated_at) VALUES($1, $2, $3, $4) RETURNING *";
  const result = await pool.query(query, [
    userId,
    amount,
    Date.now(),
    Date.now(),
  ]);
  return result.rows[0];
}
