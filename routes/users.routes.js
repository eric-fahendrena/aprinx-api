import express from "express";
import { changePhoneNumber, convertUserToTeacher, getAllUsers, getProfile } from "../controllers/users.controller.js";
import { authenticateToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/me", authenticateToken, getProfile);
router.put("/profile/phone-number/update", authenticateToken, changePhoneNumber);
router.patch("/:uId/convert-to-teacher", authenticateToken, verifyAdmin, convertUserToTeacher);

export default router;
