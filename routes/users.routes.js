import express from "express";
import { changePhoneNumber, getProfile } from "../controllers/users.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", authenticateToken, getProfile);
router.put("/profile/phone-number/update", authenticateToken, changePhoneNumber);

export default router;
