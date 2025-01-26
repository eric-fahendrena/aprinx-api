import express from "express";
import { loginWithGoogle, handleGoogleResponse } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/google", loginWithGoogle);
router.get("/google/callback", handleGoogleResponse);

export default router;
