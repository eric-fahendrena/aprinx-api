import { selectUnseenCommentNotifications, updateCommentNotificationsIsSeen } from "../models/commentNotification.model.js";

export const getUnseenNotifications = async (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: "Unauthorized" });
    const unseenNotifiations = await selectUnseenCommentNotifications(req.user.id);
    res.status(200).json(unseenNotifiations);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

export const seeAllNotifications = async (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: "Unauthorized" });
    const seenNotifications = await updateCommentNotificationsIsSeen(req.user.id);
    res.status(200).json(seenNotifications);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
