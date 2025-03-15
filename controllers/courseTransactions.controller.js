import { insertTransaction, selectTransaction, updateTransactionStatus } from "../models/courseTransaction.model.js";

export const addTransaction = async (req, res) => {
  const { course_id, trans_id, trans_exp_name, status } = req.body;
  try {
    if (!req.user)
      return res.status(401).json({ message: "access denied" });
    const buyer_id = req.user.id;
    const trans = await insertTransaction({
      course_id,
      buyer_id,
      trans_id,
      trans_exp_name,
      status,
    });
    res.status(200).json(trans);
  } catch (error) {
    console.error("Error", error);
  }
}

export const verifyTransaction = async (req, res) => {
  const { trans_id } = req.query;
  console.log(req.params);
  try {
    if (!req.user)
      return res.status(401).json({ message: "access denied" });
    const trans = await selectTransaction({
      course_author_id: req.user.id,
      trans_id,
    });
    console.log(trans);
    res.status(200).json(trans);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

export const confirmTransaction = async (req, res) => {
  const { trans_id } = req.query;
  try {
    if (!req.user)
      return res.status(401).json({ message: "unauthorized" });
    const confirmedTrans = await updateTransactionStatus(trans_id, "confirmed");
    console.log("Transaction", confirmedTrans.trans_id, "has been confirmed !");
    res.status(200).json(confirmedTrans);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
