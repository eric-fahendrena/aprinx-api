import { selectNotificationsByUserId, selectUnseenNotificationsCount, updateNotificationsIsSeenToTrue } from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  const { limit, offset } = req.query;
  try {
    if (!req.user)
      return res.status(401).json({ message: "Unauthorized to get notifications" });
    const notifications = await selectNotificationsByUserId(req.user.id, limit, offset);
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

export const getUnseenNotificationsCount = async (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: "Unauthorized to get unseen notification count" });
    const notifCount = await selectUnseenNotificationsCount(req.user.id);
    res.status(200).json(notifCount);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

export const seeAllNotifications = async (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: "Unauthorized to update notifications"});
    const notifications = await updateNotificationsIsSeenToTrue(req.user.id);
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Errror");
  }
}
