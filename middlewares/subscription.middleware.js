import { insertTeacherSubscription, selectTeacherSubscription } from "../models/teacherSubscription.model.js"

export const verifyTeacherSubscription = async (req, res, next) => {
  try {
    console.log("Verifying subscription");
    let subscription = await selectTeacherSubscription(req.user.id);
    if (!subscription) {
      console.log("Creating first subscription for user", req.user.id);
      subscription = await insertTeacherSubscription(req.user.id);
      console.log("Creating next payment data");
    }
    const dayMillis = 60 * 60 * 24 * 1000;
    const subscriptionDelay = Date.now() - parseInt(subscription.date);
    const subscriptionMaxDelay = dayMillis * process.env.TEACHER_SUBSCRIPTION_DAYS;
    if (subscriptionDelay > subscriptionMaxDelay) {
      return res.status(403).json({ message: "subscription expired" });
    }
    req.subscription = subscription;
    next();
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
