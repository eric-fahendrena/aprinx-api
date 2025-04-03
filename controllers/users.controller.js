import { selectCoursesByUserAccess } from "../models/course.model.js";
import * as userModel from "../models/user.model.js";
import { selectAccessCount } from "../models/userCourseAccess.model.js";

export const getProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userModel.findById(id);
    if (!user)
      return res.status(404).json({ message: "user not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal server error");
  }
}

export const changePhoneNumber = async (req, res) => {
  try {
    const { id } = await req.user;
    const { phone_number, phone_number_associated_name } = req.body;
    const updatedUser = await userModel.updateUserPhoneNumber(id, { phone_number, phone_number_associated_name });
    if (!updatedUser)
      return res.status(404).json({ message: "User Not Found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

export const getAllUsers = async (req, res) => {
  const { offset, limit } = req.query;
  console.log(offset);
  try {
    const users = await userModel.selectAllUsers(offset, limit);
    res.json(users);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

export const convertUserToTeacher = async (req, res) => {
  const { uId } = req.params;
  try {
    console.log("CONVERTING USER TO TEACHER");
    console.log("--------------------------");

    if (!req.user) 
      return res.status(401).json({ message: "unauthorized" });
    console.log("req.user.role", req.user.role)
    console.log("uid :", uId);

    console.log("Converting...");
    const convertedUser = await userModel.updateUserRoleToTeacher(uId);
    console.log("Converted user :", convertedUser);
    
    res.json(convertedUser);
    console.log("--------------------------");
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}

/**
 * Gets user bought courses count
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
export const getBoughtCoursesCount = async (req, res) => {
  try {
    console.log("Getting bought courses count");
    const boughtCoursesCount = await selectAccessCount(req.user.id);
    console.log("Bought courses count", boughtCoursesCount);
    
    console.log("Sending response");
    res.json(boughtCoursesCount);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Errror");
  }
}

/**
 * Gets bought courses
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
export const getBoughtCourses = async (req, res) => {
  const { offset, limit } = req.query;
  try {
    console.log("Getting bought courses...");
    const boughtCourses = await selectCoursesByUserAccess(req.user.id, offset, limit);
    console.log("Bought courses length", boughtCourses.length);
    
    console.log("Sending response");
    res.json(boughtCourses);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
