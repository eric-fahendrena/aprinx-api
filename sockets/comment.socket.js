import { selectCommentsCount } from "../models/courseComment.model.js"

export const handleCommentsSocket = (io, socket) => {
  socket.on("askCourseCommentsNumber", async (courseId) => {
    console.log("Asking course comments number...")
    const courseCommentsNumber = await selectCommentsCount(courseId);
    io.emit("receiveCourseCommentsNumber", courseCommentsNumber);
  });
}
