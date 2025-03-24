import express from "express";
import { createCourse, createVideo, getCourse, getCourses, getCoursesByKeyword, getRandCourse, getVideo, getVideos, removeCourse } from "../controllers/courses.controller.js";
import { authenticateToken, verifyTeacher } from "../middlewares/auth.middleware.js";
import { upload } from "../utils/uploader.js";
import { createCourseComment, getCourseComments } from "../controllers/courseComments.controller.js";
import { verifyTeacherSubscription } from "../middlewares/subscription.middleware.js";

const router = express.Router();

router.post("/add", authenticateToken, verifyTeacher, verifyTeacherSubscription, createCourse);
router.post("/:cId/comments/add", authenticateToken, createCourseComment);
router.post("/:cId/videos/add", authenticateToken, verifyTeacher, createVideo);
router.get("/", getCourses);
router.get("/search", getCoursesByKeyword);
router.get("/random", getRandCourse);
router.get("/:cId", getCourse);
router.get("/:cId/videos", getVideos);
router.get("/:cId/videos/:vId", authenticateToken, getVideo);
router.get("/:cId/comments", getCourseComments);
router.delete("/:cId/delete", authenticateToken, verifyTeacher, removeCourse);

export default router;
