import express from "express";
import { createDeletedCourse } from "../controllers/deletedCourses.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", authenticateToken, createDeletedCourse);

export default router;
