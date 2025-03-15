import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { getUnseenNotifications, seeAllNotifications } from "../controllers/commentNotifications.controller.js";

const router = express.Router();

router.get("/get-unseen-notifications", authenticateToken, getUnseenNotifications);
router.patch("/see-all", authenticateToken, seeAllNotifications);

export default router;
