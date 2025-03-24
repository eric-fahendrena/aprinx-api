import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { addTransaction, confirmTransaction, getTransactionCount, getTransactions } from "../controllers/courseTransactions.controller.js";

const router = express.Router();

router.post("/add", authenticateToken, addTransaction);
router.get("/", authenticateToken, getTransactions);
router.get("/count", authenticateToken, getTransactionCount);
router.patch("/confirm", authenticateToken, confirmTransaction);

export default router;
