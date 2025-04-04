import express from "express";
import { changePhoneNumber, convertUserToTeacher, getAllUsers, getBoughtCourses, getBoughtCoursesCount, getCreatedCourses, getProfile } from "../controllers/users.controller.js";
import { authenticateToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/me", authenticateToken, getProfile);
router.get("/profile/bought-courses", authenticateToken, getBoughtCourses);
router.get("/profile/bought-courses/count", authenticateToken, getBoughtCoursesCount);
router.get("/profile/created-courses", authenticateToken, getCreatedCourses);
router.put("/profile/phone-number/update", authenticateToken, changePhoneNumber);
router.patch("/:uId/convert-to-teacher", authenticateToken, verifyAdmin, convertUserToTeacher);

export default router;
