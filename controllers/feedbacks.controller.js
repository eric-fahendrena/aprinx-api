import { insertFeedback } from "../models/feedback.model.js";

export const createFeedback = async (req, res) => {
  const { authorId, message } = req.body;
  try {
    console.log("CREATING FEEDBACK");
    console.log("-----------------");

    console.log("Creating...");
    const createdFeedback = await insertFeedback({ authorId, message });
    console.log("Created feedback :", createdFeedback);

    res.json(createdFeedback);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
