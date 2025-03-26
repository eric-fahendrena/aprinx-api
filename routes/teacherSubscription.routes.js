import express from "express";
import { authenticateToken, verifyTeacher } from "../middlewares/auth.middleware.js";
import { getTeacherSubscription } from "../controllers/teacherSubscriptions.controller.js";
import { verifyTeacherSubscription } from "../middlewares/subscription.middleware.js";

const router = express.Router();

router.get("/:uId", authenticateToken, verifyTeacher, verifyTeacherSubscription, getTeacherSubscription);

export default router;
