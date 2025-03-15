import express from "express";
import { loginWithGoogle, handleGoogleResponse, sendJwtToken, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/google", loginWithGoogle);
router.get("/google/callback", handleGoogleResponse);
router.get("/get-token", sendJwtToken);
router.get("/logout", logout);

export default router;
