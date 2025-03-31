import jwt from "jsonwebtoken";
import { findById } from "../models/user.model.js";

export const authenticateToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "unauthorized"})
    }
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    if (decoded.id === undefined)
      return res.status(401).json({ message: "unauthorized" });
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal server error");
  }
}

export const verifyAdmin = async (req, res, next) => {
  const userData = await findById(req.user.id);
  if (userData.role !== "ADMIN")
    return res.status(403).json({ message: "only admin can do this action" });
  next();
}

export const verifyTeacher = async (req, res, next) => {
  console.log("Verifying if user is TEACHER or ADMIN");
  console.log("Getting user data");
  const userData = await findById(req.user.id);
  console.log("User role is", userData.role);
  if (userData.role !== "ADMIN" && userData.role !== "TEACHER")
    return res.status(403).json({ message: `only admin or teacher can do this action ! Role : ${userData.role}` });
  next();
}

export const verifyPhoneNumber = async (req, res, next) => {
  console.log("Verifying if user has phone number...");
  const user = await findById(req.user.id);
  if (!user.phone_number || !user.phone_number_associated_name) {
    console.log("User doesn't have phone number");
    return res.status(403).json({ message: "phone number is required" });
  }
  next();
}
