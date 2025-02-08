import { addCourse, selectAllCourses, selectCourse } from "../models/course.model.js";
import { uploadPhoto } from "../utils/uploader.js";

export const createCourse = async (req, res) => {
  const { category, title, description } = req.body;
  try {
    if (!req.user) {
      return res.status(403).json({ message: "forbidden" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "no cover photo found" });
    }

    const { id } = req.user;
    console.log("uploading cover photo to cloudinary...");
    const uploadResult = await uploadPhoto(`./tmp/upload/${req.file.filename}`, "APX_" + Date.now());
    const coverPhoto = uploadResult.url;

    const course = await addCourse({
      author_id: id,
      cover_photo: coverPhoto,
      category,
      title, 
      description,
    });
    res.status(200).json(course);
    console.log("Course added with success");
    console.log(course);
  } catch (error) {
    console.error("Error", error);
  }
}

export const getCourses = async (req, res) => {
  try {
    const courses = await selectAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

export const getCourse = async (req, res) => {
  const { cId } = req.params;
  try {
    const course = await selectCourse(cId);
    res.status(200).json(course);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
