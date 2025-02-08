import express from "express";
import { createCourse, getCourse, getCourses } from "../controllers/courses.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { upload } from "../utils/uploader.js";

const router = express.Router();

router.post("/add", authenticateToken, upload.single("cover_photo_file"), createCourse);
router.get("/", getCourses);
router.get("/:cId", getCourse);

export default router;
