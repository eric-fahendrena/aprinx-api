import express from "express";
import { loginWithGoogle, handleGoogleResponse, sendJwtToken } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/google", loginWithGoogle);
router.get("/google/callback", handleGoogleResponse);
router.get("/get-token", sendJwtToken);

export default router;
