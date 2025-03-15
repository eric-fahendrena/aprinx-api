import { insertDeletedCourse } from "../models/deletedCourse.model.js";

export const createDeletedCourse = async (req, res) => {
  const dcData = req.body;
  try {
    if (!req.user)
      return res.status(401).json({ message: "unauthorized" });
    const deletedCourse = await insertDeletedCourse(dcData);
    res.json(deletedCourse);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
