import express from "express";
import { createCourseLike, getCourseLike } from "../controllers/courseLikes.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:cId/add", authenticateToken, createCourseLike);
router.get("/:cId", authenticateToken, getCourseLike);

export default router;
