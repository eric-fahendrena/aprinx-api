import { insertTransaction, selectTransaction } from "../models/courseTransaction.model.js";

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
    if (!trans)
      return res.status(404).json({ message: `transaction with course creator id : ${req.user.id} and trans.ID : ${trans_id} not found` });
    res.status(200).json(trans);
  } catch (error) {
    console.error("Error", error);
    res.status(200).send("Internal Server Error");
  }
}
