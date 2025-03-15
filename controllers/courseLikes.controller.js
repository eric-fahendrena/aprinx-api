import { deleteCourseLike, insertCourseLike, selectCourseLike } from "../models/courseLikes.model.js";

export const createCourseLike = async (req, res) => {
  const { cId } = req.params;
  try {
    if (!req.user) 
      return res.status(401).json({ message: "access unauthorized" });
    const deletedLike = await deleteCourseLike({ course_id: cId, user_id: req.user.id });
    if (deletedLike)
      return res.status(200).json({ liked: false });
    const like = await insertCourseLike({ course_id: cId, user_id: req.user.id });
    res.status(200).json({ liked: true });
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

export const getCourseLike = async (req, res) => {
  const { cId } = req.params;
  try {
    if (!req.user)
      return res.status(401).json({ message: "Unauthorized" });
    const like = await selectCourseLike({ course_id: cId, user_id: req.user.id });
    if (!like)
      return res.json(null);
    res.json(like);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
