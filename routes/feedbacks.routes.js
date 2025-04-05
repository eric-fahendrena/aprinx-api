import express from "express";
import { createFeedback, getAllFeedbacks } from "../controllers/feedbacks.controller.js";
import { authenticateToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, verifyAdmin, getAllFeedbacks);
router.post("/add", createFeedback);

export default router;
