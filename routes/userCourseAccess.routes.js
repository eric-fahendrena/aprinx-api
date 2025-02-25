import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { addAccess } from "../controllers/userCourseAccess.controller.js";

const router = express.Router();

router.post("/add", authenticateToken, addAccess);

export default router;
