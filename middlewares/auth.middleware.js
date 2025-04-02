import jwt from "jsonwebtoken";
import { findById, selectUserRole } from "../models/user.model.js";

export const authenticateToken = async (req, res, next) => {
  try {
    console.log("AUTHENTICATING TOKEN");
    console.log("--------------------");

    const token = req.header("Authorization");
    console.log("Token :", token);
    if (!token) {
      console.log("401, Unauthorized !")
      return res.status(401).json({ message: "unauthorized"})
    }
    console.log("Deconding token...");
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    console.log("Decoded token :", decoded);
    if (decoded.id === undefined)
      return res.status(401).json({ message: "unauthorized" });
    
    console.log("Adding user role to req.user...");
    console.log("Getting user role...");
    const userData = await selectUserRole(decoded.id)
    req.user = {
      id: decoded.id,
      role: userData.role,
    };
    console.log("req.user :", req.user);
    next();
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal server error");
  }
}

export const verifyAdmin = (req, res, next) => {
  console.log("VERIFYING ADMIN");
  console.log("---------------");

  console.log("req.user.id :", req.user.id);
  console.log("req.user.role :", req.user.role);
  if (req.user.role !== "ADMIN") {
    console.log("403, Forbidden !");
    return res.status(403).json({ message: "only admin can do this action" });
  }
  next();
}

export const verifyTeacher = async (req, res, next) => {
  console.log("VERIFYING TEACHER");
  console.log("-----------------");

  console.log("** ADMIN is also a TEACHER");

  console.log("req.user.id :", req.user.id);
  console.log("req.user.role :", req.user.role);

  if (req.user.role !== "ADMIN" && req.user.role !== "TEACHER") {
    console.log("403, Forbidden !");
    return res.status(403).json({ message: `only admin or teacher can do this action ! Role : ${req.user.role}` });
  }
  next();
}

export const verifyPhoneNumber = async (req, res, next) => {
  console.log("VERIFYING PHONE NUMBER");
  console.log("----------------------");

  console.log("Getting user data...");
  const user = await findById(req.user.id);
  
  console.log("user.phone_number :", user.phone_number);
  console.log("user.phone_number_associated_name :", user.phone_number_associated_name);

  if (!user.phone_number || !user.phone_number_associated_name) {
    console.log("403, Forbidden !");
    return res.status(403).json({ message: "phone number is required" });
  }
  next();
}
