import { insertTeacherSubscription, selectTeacherSubscription } from "../models/teacherSubscription.model.js"

export const verifyTeacherSubscription = async (req, res, next) => {
  try {
    console.log("VERIFYING TEACHER SUBSCRIPTION...");

    if (req.user.role !== "TEACHER" && req.user.role !== "ADMIN") {
      console.log("Cannot continue because user is not TEACHER !");
      return res.status(403).json({ message: "forbidden" });
    }

    console.log("Checking if user already has a subscription...");
    let teacherSubscription = await selectTeacherSubscription(req.user.id);
    if (!teacherSubscription) {
      console.log("User doesn't still have a subscription !");
      console.log("Creating first subscription for user", req.user.id);
      teacherSubscription = await insertTeacherSubscription(req.user.id);
    }
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
    
    if (status === "EXPIRED") {
      console.log("Subscription expired");
      return res.status(403).json({ message: "teacher subscription expired" });
    }

    console.log("Subscription is ok");
    req.teacherSubscription = teacherSubscription;
    next();
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
