import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { addAccess, getAccess } from "../controllers/userCourseAccess.controller.js";

const router = express.Router();

router.post("/add", authenticateToken, addAccess);
router.get("/:courseId", authenticateToken, getAccess);

export default router;
