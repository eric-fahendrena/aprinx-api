import { addCourse, addVideo, selectAllCourses, selectCourse, selectRandCourse, selectVideo, selectVideos } from "../models/course.model.js";
import { uploadPhoto, uploadVideo } from "../utils/uploader.js";

export const createCourse = async (req, res) => {
  const { category, price, title, description } = req.body;
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
    console.log(price)
    const course = await addCourse({
      author_id: id,
      cover_photo: coverPhoto,
      category,
      price,
      title, 
      description,
    });
    if (!course) {
      res.status(400).json({ message: "Bad Request" });
    }
    res.status(200).json(course);
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

export const getRandCourse = async (req, res) => {
  req.session.displayedCourses = req.session.displayedCourses || [];
  try {
    const course = await selectRandCourse(req.session.displayedCourses);
    console.log("Random Course");
    console.log(course);
    res.status(200).json(course);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

export const createVideo = async (req, res) => {
  const { cId } = req.params;
  const { title, description, access, url, thumbnail } = req.body;
  try {
    if (!req.user)
      return res.status(401).json({ message: "access unauthorized" });
    const course = await selectCourse(cId);
    if (!course)
      return res.status(404).json({ message: "course not found" });
    if (course.author_id !== req.user.id)
      return res.status(403).json({ message: "access forbidden" });
    
    const vData = {
      course_id: cId,
      author_id: req.user.id,
      title,
      description,
      access,
      url,
      thumbnail,
    };
    // sending video data
    console.log("Sending course video data...");
    const addingVideoResult = await addVideo(vData);
    res.json(addingVideoResult);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

export const getVideos = async (req, res) => {
  const { cId } = req.params;
  try {
    const cVideos = await selectVideos(cId);
    if (!cVideos) 
      return res.status(404).json({ message: "course not found" });
    res.status(200).json(cVideos);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

export const getVideo = async (req, res) => {
  const { cId, vId } = req.params;
  try {
    const cVideo = await selectVideo(cId, vId);
    if (!cVideo)
      return res.status(404).json({ message: "video not found" });
    res.status(200).json(cVideo);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
