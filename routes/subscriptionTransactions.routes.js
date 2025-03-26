import express from "express";
import { authenticateToken, verifyAdmin, verifyTeacher } from "../middlewares/auth.middleware.js";
import { confirmSubscriptionTransaction, createSubscriptionTransaction, getPendingSubscriptionTransactions, getPendingSubscriptionTransactionsCount } from "../controllers/subscriptionTransactions.controller.js";

const router = express.Router();

router.post("/add", authenticateToken, verifyTeacher, createSubscriptionTransaction);
router.get("/pending", authenticateToken, verifyAdmin, getPendingSubscriptionTransactions);
router.get("/count", authenticateToken, verifyAdmin, getPendingSubscriptionTransactionsCount);
router.patch("/:transId/confirm", authenticateToken, verifyAdmin, confirmSubscriptionTransaction);

export default router;
