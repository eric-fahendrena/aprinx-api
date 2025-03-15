import { selectCourseLikesCount } from "../models/courseLikes.model.js";

export const handleLikesSocket = (io, socket) => {
  socket.on("askCourseLikesCount", async (courseId) => {
    console.log("Asking for course likes count");
    const courseLikesCount = await selectCourseLikesCount(courseId);
    io.emit("receiveCourseLikesCount", courseLikesCount);
  });
}