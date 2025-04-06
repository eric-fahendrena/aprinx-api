import { insertNotification, selectNotificationByCourseId, updateNotificationAuthorNames } from "../models/notification.model.js";

/**
 * Handles notification events
 * 
 * @param {*} io 
 * @param {*} socket 
 */
export const handleNotification = (io, socket) => {
  /**
   * Sends notification
   */
  socket.on("sendNotification", async (data) => {
    const { userId, courseId, authorNames, type } = data;
    let notification;

    console.log(`SENDING ${type} NOTIFICATION`);

    console.log("Checking if same notification already exists...");
    notification = await selectNotificationByCourseId(userId, courseId, type);
    if (!notification) {
      console.log("Same notification doesn't still exist !");
      console.log("Creating a notification...");
      notification = await insertNotification({ userId, courseId, authorNames, type });
      console.log(notification ? "Notification successfully created !" : "(!) Failed to create notification !");
    } else {
      console.log("Same notification already exists !");
      console.log("Updating the notification...");
      const updatedNotification = await updateNotificationAuthorNames(notification.id, authorNames);
      if (!updatedNotification) {
        console.log("(!) Failed to update notification !");
      } else {
        notification = updatedNotification;
        console.log("Notification successfully updated !");
      }
    }

    console.log("Emitting receiveNotification event.");
    io.to(userId).emit("receiveNotification", notification);
  })

  /**
   * Joins user room
   */
  socket.on("joinUserRoom", (userId) => {
    console.log(userId, "joined the room");
    socket.join(userId);
  });  
}
