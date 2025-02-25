import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { addTransaction, verifyTransaction } from "../controllers/courseTransactions.controller.js";

const router = express.Router();

router.post("/add", authenticateToken, addTransaction);
router.get("/", authenticateToken, verifyTransaction);

export default router;
