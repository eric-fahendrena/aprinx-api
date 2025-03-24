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
    
    console.log("Getting teacher subscription detail");
    const teacherSubscription = await selectTeacherSubscription(req.user.id);
    const days30 = 1000 * 60 * 60 * 24 * 30;
    const exprirationDate = parseInt(teacherSubscription.date) + days30;
    let status = "ACTIVE";
    let renewable = false;
    const week = 1000 * 60 * 60 * 24 * 7;
    if (Date.now() > exprirationDate) {
      status = "EXPIRED";
    }
    if (Date.now() > exprirationDate - week) {
      renewable = true;
    }

    teacherSubscription.status = status;
    teacherSubscription.renewable = renewable;
    teacherSubscription.expiration_date = exprirationDate;

    console.log("Sending response");
    res.json(teacherSubscription);
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
