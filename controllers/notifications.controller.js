import { selectAllNotificationsByUserId, selectUnseenNotificationsCount, updateNotificationIsReadToTrue, updateNotificationsIsSeenToTrue } from "../models/notification.model.js";

export const getAllNotifications = async (req, res) => {
  const { limit, offset } = req.query;
  try {
    if (!req.user)
      return res.status(401).json({ message: "Unauthorized to get notifications" });
    
    console.log("Getting all notifications...");
    const notifications = await selectAllNotificationsByUserId(req.user.id, offset, limit);
    console.log("Notifications", notifications);
    
    console.log("Sending response");
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

/**
 * Reads notification
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
export const readNotification = async (req, res) => {
  const { notifId } = req.params;
  try {
    console.log("Reading notification...");
    const updatedNotification = await updateNotificationIsReadToTrue(req.user.id, notifId);
    
    console.log("Sending response");
    res.json(updatedNotification);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
