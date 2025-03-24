import { addCourse, addVideo,  deleteCourse,  selectAllCourses, selectCourse, selectCoursesByKeyword, selectRandCourse, selectVideo, selectVideos } from "../models/course.model.js";
import { selectAccess } from "../models/userCourseAccess.model.js";

/**
 * Creates course
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
export const createCourse = async (req, res) => {
  const { category, price, title, description, coverPhotoUrl } = req.body;
  try {
    if (!req.user) {
      return res.status(403).json({ message: "forbidden" });
    }

    const { id } = req.user;
    
    console.log("Adding course data")
    const course = await addCourse({
      author_id: id,
      cover_photo: coverPhotoUrl,
      category,
      price,
      title, 
      description,
    });

    console.log("Sending response");
    if (!course) {
      return res.status(400).json({ message: "Bad Request" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error("Error", error);
  }
}

export const removeCourse = async (req, res) => {
  const { cId } = req.params;
  try {
    if (!req.user)
      return res.status(401).json({ message: "unauthorized" });
    const deletedCourse = await deleteCourse(cId);
    res.json(deletedCourse)
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

export const getCourses = async (req, res) => {
  const { limit, offset } = req.query;
  try {
    console.log("Getting all courses...");
    console.log("limit", limit, ", offset", offset);
    const courses = await selectAllCourses(offset, limit);
    console.log("Loaded courses", courses.length);
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

export const getCoursesByKeyword = async (req, res) => {
  const { keyword, offset, limit } = req.query;
  console.log("offset", offset, "limit", limit);
  try {
    const courses = await selectCoursesByKeyword(keyword, offset, limit)
    res.json(courses);
  } catch (error) {
    console.log("Error", error);
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
    res.status(200).json(course);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

export const createVideo = async (req, res) => {
  const { cId } = req.params;
  const { title, description, access, url, thumbnail } = req.body;
  console.log(req.body)
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
    console.log(vData);
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
    console.log(cVideos)
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
    if (cVideo.access === "free")
      return res.status(200).json(cVideo);
    // if video is not free
    if (!req.user)
      return res.status(401).json({ message: "unauthorized" });
    const courseAccess = await selectAccess(cId, req.user.id);
    console.log(courseAccess);
    if (!courseAccess && cVideo.author_id !== req.user.id)
      return res.status(403).json({ message: "forbidden" });
    res.status(200).json(cVideo);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
