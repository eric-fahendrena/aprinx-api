import express from "express";
import { createCourse, createVideo, getCourse, getCourses, getRandCourse, getVideo, getVideos, isLiked, reactCourse } from "../controllers/courses.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { upload } from "../utils/uploader.js";

const router = express.Router();

router.post("/add", authenticateToken, upload.single("cover_photo_file"), createCourse);
router.get("/", getCourses);
router.get("/random", getRandCourse);
router.get("/:cId", getCourse);
router.post("/:cId/react", authenticateToken, reactCourse);
router.get("/:cId/is-liked", authenticateToken, isLiked);
router.post("/:cId/videos/add", authenticateToken, upload.fields([
  {name: "video_file"},
  {name: "thumbnail_file"},
]), createVideo);
router.get("/:cId/videos", getVideos);
router.get("/:cId/videos/:vId", getVideo);

export default router;
