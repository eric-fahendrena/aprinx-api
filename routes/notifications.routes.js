import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { getAllNotifications, getUnseenNotificationsCount, readNotification, seeAllNotifications } from "../controllers/notifications.controller.js";

const router = express.Router();

router.get("/", authenticateToken, getAllNotifications);
router.get("/unseen-count", authenticateToken, getUnseenNotificationsCount);
router.patch("/see-all", authenticateToken, seeAllNotifications);
router.patch("/:notifId/read", authenticateToken, readNotification);

export default router
