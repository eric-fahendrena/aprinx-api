import { insertCommentNotification, selectCommentNotificationByCourseId, updateCommentNotificationAuthorNames } from "../models/commentNotification.model.js";
import { insertCourseAccessNotification, selectCourseAccessNotification } from "../models/courseAccessNotification.model.js";
import { insertLikeNotification, selectLikeNotificationByCourseId, updateLikeNotificationAuthorNames } from "../models/likeNotification.model.js";

export const handleNotification = (io, socket) => {
  socket.on("sendCommentNotification", async (data) => {
    const { userId, courseId, authorNames } = data;
    
    console.log("Send notification to", userId);
    let notification = await selectCommentNotificationByCourseId(courseId);
    if (!notification) {
      notification = await insertCommentNotification({ userId, courseId, authorNames });
    } else {
      console.log("Notification already exists ! Just update it.");
      notification = await updateCommentNotificationAuthorNames(notification.id, authorNames);
    }
    
    console.log("Emitting receiveNotification event");
    io.to(userId).emit("receiveNotification", notification);
  });

  socket.on("sendLikeNotification", async (data) => {
    const { userId, courseId, authorNames } = data;

    console.log("Send like notification to", userId);
    let notification = await selectLikeNotificationByCourseId(courseId);
    if (!notification) {
      notification = await insertLikeNotification({ userId, courseId, authorNames });
    } else {
      console.log("Like notification already exists ! Just update it.");
      notification = await updateLikeNotificationAuthorNames(notification.id, authorNames);
    }

    console.log("Emitting receiveNotification event");
    io.to(userId).emit("receiveNotification", notification);
  });

  socket.on("sendCourseAccessNotification", async (data) => {
    const { userId, courseId, authorNames } = data;
    let notification = await selectCourseAccessNotification(courseId, userId);
    if (!notification) {
      notification = await insertCourseAccessNotification({ userId, courseId, authorNames });
    } else {
      console.log("Course access notification already exists ! Just update id.");
    }

    console.log("Emitting receiveNotification event");
    io.to(userId).emit("receiveNotification", notification);
  });
  
  socket.on("joinUserRoom", (userId) => {
    console.log(userId, "joined the room");
    socket.join(userId);
  });
}
