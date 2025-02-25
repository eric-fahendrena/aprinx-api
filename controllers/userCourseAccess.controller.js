import { selectCourse } from "../models/course.model.js";
import { insertAccess } from "../models/userCourseAccess.model.js";

export const addAccess = async (req, res) => {
  const { course_id, user_id } = req.body;
  const courseAuthorId = req.user.id;
  try {
    if (!courseAuthorId)
      return res.status(401).json({ message: "access denied" });
    const course = await selectCourse(course_id);
    if (!course)
      return res.status(404).json({ message: "course not found" });
    if (course.author_id !== courseAuthorId)
      return res.status(403).json({ message: "forbidden" });
    if (user_id === courseAuthorId)
      return res.status(403).json({ message: "user_id and course_author_id cannot be the same" });
    const userCourseAccess = await insertAccess(course_id, user_id);
    res.status(200).json(userCourseAccess);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
