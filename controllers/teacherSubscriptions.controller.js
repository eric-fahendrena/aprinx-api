import { selectTeacherSubscription } from "../models/teacherSubscription.model.js";

/**
 * Gets teacher subscription
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
export const getTeacherSubscription = async (req, res) => {
  const { uId } = req.param;
  try {
    if (!req.user)
      return res.status(401).json({ message: "unauthorized" });

    console.log("GETTING TEACHER SUBSCRIPTION DETAIL")
    const { teacherSubscription } = req;
    console.log(teacherSubscription);
    
    console.log("Sending response");
    res.json(teacherSubscription);
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
