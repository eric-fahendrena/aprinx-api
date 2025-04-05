import { insertFeedback, selectAllFeedbacks } from "../models/feedback.model.js";

/**
 * Creates feedback
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
export const createFeedback = async (req, res) => {
  const { authorId, message } = req.body;
  try {
    console.log("CREATING FEEDBACK");
    console.log("-----------------");

    console.log("Creating...");
    const createdFeedback = await insertFeedback({ authorId, message });
    console.log("Created feedback :", createdFeedback);

    res.json(createdFeedback);
    console.log("---");
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

export const getAllFeedbacks = async (req, res) => {
  const { offset, limit } = req.query;
  try {
    console.log("GETTING ALL FEEDBACKS");
    console.log("---------------------");

    console.log("Getting feedbacks...");
    const feedbacks = await selectAllFeedbacks(offset, limit);
    
    res.json(feedbacks);
    console.log("---");
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
