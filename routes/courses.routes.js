import express from "express";
import { createCourse, createVideo, getCourse, getCourses, getRandCourse, getVideo, getVideos, removeCourse } from "../controllers/courses.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { upload } from "../utils/uploader.js";
import { createCourseComment, getCourseComments } from "../controllers/courseComments.controller.js";

const router = express.Router();

router.post("/add", authenticateToken, createCourse);
router.post("/:cId/comments/add", authenticateToken, createCourseComment);
router.post("/:cId/videos/add", authenticateToken, createVideo);
router.get("/", getCourses);
router.get("/random", getRandCourse);
router.get("/:cId", getCourse);
router.get("/:cId/videos", getVideos);
router.get("/:cId/videos/:vId", authenticateToken, getVideo);
router.get("/:cId/comments", getCourseComments);
router.delete("/:cId/delete", authenticateToken, removeCourse);

export default router;
