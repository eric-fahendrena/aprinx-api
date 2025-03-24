import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { getTeacherSubscription } from "../controllers/teacherSubscriptions.controller.js";

const router = express.Router();

router.get("/:uId", authenticateToken, getTeacherSubscription);

export default router;
