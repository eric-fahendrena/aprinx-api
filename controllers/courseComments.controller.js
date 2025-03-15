import { insertComment, selectCommentById, selectComments } from "../models/courseComment.model.js";

export const createCourseComment = async (req, res) => {
  const { message } = req.body;
  const course_id = req.params.cId;
  try {
    if (!req.user)
      return res.status(401).json({ message: "Unauthorized" });
    const author_id = req.user.id;
    const parent_id = null;
    const createdComment = await insertComment({ author_id, course_id, parent_id, message});
    const fullDetailComment = await selectCommentById(createdComment.id); 
    res.status(200).json(fullDetailComment);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

export const getCourseComments = async (req, res) => {
  const { cId } = req.params;
  const { limit, offset } = req.query;
  try {
    const courses = await selectComments(cId, limit, offset);
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
