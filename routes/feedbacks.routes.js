import express from "express";
import { createFeedback } from "../controllers/feedbacks.controller.js";

const router = express.Router();

router.post("/add", createFeedback);

export default router;
