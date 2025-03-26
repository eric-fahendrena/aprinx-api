import { insertSubscriptionTransaction, selectPendingSubscriptionTransactions, selectPendingSubscrptionTransactionsCount, updateSubscriptionTransactionStatus } from "../models/subscriptionTransaction.model.js";
import { insertTeacherSubscription, selectTeacherSubscriptionDate } from "../models/teacherSubscription.model.js";

/**
 * Creates subscription transaction
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
export const createSubscriptionTransaction = async (req, res) => {
  const { screenshotUrl, targetAmount } = req.body;
  try {
    console.log("Creating subscription transactions");
    const subscriptionTransaction = await insertSubscriptionTransaction({
      userId: req.user.id,
      screenshotUrl,
      targetAmount,
    });
    console.log("Sending response...");
    res.json(subscriptionTransaction)
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

/**
 * Gets pending subscription transactions
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
export const getPendingSubscriptionTransactions = async (req, res) => {
  const { offset, limit } = req.query;
  try {
    console.log("Getting pending subscription transactions");
    const transactions = await selectPendingSubscriptionTransactions(offset, limit);
    
    console.log(transactions.length, "transactions");
    res.json(transactions);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

/**
 * Confirms a subscription transaction
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
export const confirmSubscriptionTransaction = async (req, res) => {
  const { transId } = req.params;
  try {
    console.log("Confirming subscription transaction...");
    console.log("Trans id", transId);
    const confirmedTrans = await updateSubscriptionTransactionStatus(transId, "CONFIRMED");
    if (!confirmedTrans) {
      throw new Error("Confirmation failed !");
    }
    console.log("confirmed transaction", confirmedTrans);
    console.log("Transaction", confirmedTrans.id, "successfully confirmed");

    console.log("Checking if previous subscription is renewable");
    let renewable = true;
    const subscriptionDate = await selectTeacherSubscriptionDate(confirmedTrans.user_id);
    console.log("Subscription date", subscriptionDate);
    const days30 = 1000 * 60 * 60 * 24 * 30;
    const week = 1000 * 60 * 60 * 24 * 7;
    const expirationDate = parseInt(subscriptionDate) + days30;
    if (Date.now() <= expirationDate - week) {
      renewable = false;
    }

    if (!renewable) {
      console.log("Previous subscription NOT RENEWABLE !");
      console.log("Sending response");
      return res.json(confirmedTrans);
    }
    console.log("Previous subscription is RENEWABLE !");

    console.log("Creating new subscription...");
    const subscription = await insertTeacherSubscription(confirmedTrans.user_id);
    console.log("Subscription successfully created !");

    console.log("Sending response");
    res.json(confirmedTrans);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

/**
 * Gets pending subscription transactions count
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
export const getPendingSubscriptionTransactionsCount = async (req, res) => {
  try {
    const transCount = await selectPendingSubscrptionTransactionsCount();
    res.json(transCount);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
