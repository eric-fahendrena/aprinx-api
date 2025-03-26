import { selectCoursePrice } from "../models/course.model.js";
import { insertTransaction, selectTransactionCountByCourseAuthor, selectTransactionsByCourseAuthor, updateTransactionStatus } from "../models/courseTransaction.model.js";
import { selectTeacherSubscription, updateTeacherSubscriptionNextAmount } from "../models/teacherSubscription.model.js";
import { insertAccess, selectAccess } from "../models/userCourseAccess.model.js";

/**
 * Saves transaction data
 * 
 * @param {Express.Request} req
 * @param {Express.Response}  res
 */
export const addTransaction = async (req, res) => {
  const { courseId, screenshotUrl } = req.body;
  try {
    // Verifies if user is authentified
    if (!req.user)
      return res.status(401).json({ message: "access denied" });
    
    const buyerId = req.user.id;
    
    console.log("Saving transaction data to course_transactions table...");
    const trans = await insertTransaction({
      courseId,
      buyerId,
      screenshotUrl,
    });
    if (trans) {
      console.log("Transaction data saved successfully !");
    } else {
      console.log("Saving failed !");
    }

    console.log("Sending response to client");
    res.status(200).json(trans);
  } catch (error) {
    console.error("Error", error);
  }
}

/**
 * Gets the list of transactions where the authenticated user is the author of the courses
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
export const getTransactions = async (req, res) => {
  const { offset, limit } = req.query;
  try {
    // Verifies if user is authentified
    if (!req.user)
      return res.status(401).json({ message: "unauthorized" });
    
    console.log("Getting transactions list");
    console.log("Offset :", offset);
    console.log("Limit :", limit);
    const transactions = await selectTransactionsByCourseAuthor(req.user.id, offset, limit);

    console.log("Sending response");
    res.json(transactions)
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

/**
 * Gets the total of transactions where the authentified user is the author of the courses
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
export const getTransactionCount = async (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: "unauthorized" });

    console.log("Getting transaction count");
    const transactionCount = await selectTransactionCountByCourseAuthor(req.user.id);
    console.log("Transaction count :", transactionCount);

    console.log("Sending response");
    res.json(transactionCount);
  } catch (error) {
    console.error("Error", error);
    res.statu(500).send("Internal Server Error");
  }
}

/**
 * Confirms a transaction and gives some access to the buyer
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
export const confirmTransaction = async (req, res) => {
  const { trans_id } = req.query;
  try {
    if (!req.user)
      return res.status(401).json({ message: "unauthorized" });
    
    console.log("Getting subscription infos ...");
    const subscription = await selectTeacherSubscription(req.user.id);
    console.log("Current subscription payment amount", subscription.next_payment_amount);
    
    console.log("Confirming transaction");
    const confirmedTrans = await updateTransactionStatus(trans_id, "CONFIRMED");
    console.log("Transaction", confirmedTrans.id, "has been confirmed !");
    
    console.log("Getting course price ...");
    const coursePrice = await selectCoursePrice(confirmedTrans.course_id);
    console.log("Course price", coursePrice);
    console.log(`20% of course (${coursePrice * 0.2}Ar) price will increment next subscription amount.`);
    
    console.log("Checking if user already has access to course");
    const courseAccess = await selectAccess(confirmedTrans.course_id, confirmedTrans.buyer_id);
    if (!courseAccess) {
      const createdCourseAccess = await insertAccess(confirmedTrans.course_id, confirmedTrans.buyer_id);
      console.log("User doesn't still have access to the course");
      console.log("Updating next subscription amount...");
      const nextSubscriptionAmount = subscription.next_payment_amount + (coursePrice * 0.2);
      const updatedSubscription = await updateTeacherSubscriptionNextAmount(req.user.id, nextSubscriptionAmount);
      console.log("Next subscription amount", updatedSubscription.next_payment_amount);
    } else {
      console.log("User already has access to the course");
    }
    
    console.log("Sending response");
    res.status(200).json(confirmedTrans);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
