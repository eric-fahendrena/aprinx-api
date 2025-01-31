import express from "express";
import { getProfile } from "../controllers/users.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", authenticateToken, getProfile);

export default router;
