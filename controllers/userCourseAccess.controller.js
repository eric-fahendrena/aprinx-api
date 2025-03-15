import { selectCourse } from "../models/course.model.js";
import { insertAccess, selectAccess } from "../models/userCourseAccess.model.js";

export const addAccess = async (req, res) => {
  const { courseId, userId } = req.body;
  const courseAuthorId = req.user.id;
  try {
    if (!courseAuthorId)
      return res.status(401).json({ message: "access denied" });
    const course = await selectCourse(courseId);
    if (!course)
      return res.status(404).json({ message: "course not found" });
    if (course.author_id !== courseAuthorId)
      return res.status(403).json({ message: "forbidden" });
    if (userId === courseAuthorId)
      return res.status(403).json({ message: "user_id and course_author_id cannot be the same" });
    const userCourseAccess = await insertAccess(courseId, userId);
    if (userCourseAccess) console.log("Course access created !");
    res.status(200).json(userCourseAccess);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

export const getAccess = async (req, res) => {
  const { courseId } = req.params;
  try {
    if (!req.user)
      return res.status(401).json({ message: "unauthorized" })
    const access = await selectAccess(courseId, req.user.id);
    console.log("access")
    res.json(access);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
