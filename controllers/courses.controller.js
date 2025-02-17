import { addCourse, addVideo, selectAllCourses, selectCourse, selectRandCourse, selectVideo, selectVideos } from "../models/course.model.js";
import { uploadPhoto, uploadVideo } from "../utils/uploader.js";
import { io } from "../server.js";

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
  const { title, description, access } = req.body;
  try {
    if (!req.user)
      return res.status(401).json({ message: "access unauthorized" });
    const course = await selectCourse(cId);
    if (!course)
      return res.status(404).json({ message: "course not found" });
    if (course.author_id !== req.user.id)
      return res.status(403).json({ message: "access forbidden" });
    
    console.log("Uploading course video...");
    const vidUploadResult = await uploadVideo(`./tmp/upload/${req.files.video_file[0].filename}`, "VID_" + Date.now());
    const url = vidUploadResult.url;
    console.log("Course video uploaded with success !");
    
    console.log("Uploading course video thumbnail...");
    const thumbUploadResult = await uploadPhoto(`./tmp/upload/${req.files.thumbnail_file[0].filename}`, "IMG_" + Date.now());                               
    const thumbnail = thumbUploadResult.url;
    console.log("Course video thumbnail uploaded with success !");
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
