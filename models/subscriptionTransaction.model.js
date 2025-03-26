import pool from "../db/pool.js";

/**
 * Inserts subscription transaction
 * 
 * @param {object} data 
 * @returns {object}
 */
export const insertSubscriptionTransaction = async (data) => {
  const query = "INSERT INTO subscription_transactions (user_id, screenshot_url, target_amount, date) VALUES($1, $2, $3, $4) RETURNING *";
  const result = await pool.query(query, [data.userId, data.screenshotUrl, data.targetAmount, Date.now() ]);
  return result.rows[0];
}

/**
 * Selects pending subscription transactions
 * 
 * @param {number|string} offset 
 * @param {number|string} limit 
 * @returns {Array<object>}
 */
export const selectPendingSubscriptionTransactions = async (offset, limit) => {
  const query = "SELECT subscription_transactions.*, users.name AS user_name FROM subscription_transactions INNER JOIN users ON users.id = subscription_transactions.user_id WHERE status = 'PENDING' ORDER BY subscription_transactions.id OFFSET $1 LIMIT $2";
  const result = await pool.query(query, [ offset, limit ]);
  return result.rows;
}

/**
 * Updates subscription transaction status
 * 
 * @param {number} transId 
 * @param {string} status 
 * @returns {object}
 */
export const updateSubscriptionTransactionStatus = async (transId, status) => {
  const query = "UPDATE subscription_transactions SET status = $1 WHERE id = $2 RETURNING *";
  const result = await pool.query(query, [ status, transId ]);
  return result.rows[0];
}

/**
 * Selects pending subscription transacations count
 * 
 * @returns {number} the total of the pending transactions
 */
export const selectPendingSubscrptionTransactionsCount = async () => {
  const query = "SELECT COUNT(*) AS total FROM subscription_transactions WHERE status = 'PENDING'";
  const result = await pool.query(query, []);
  return result.rows[0].total;
}
