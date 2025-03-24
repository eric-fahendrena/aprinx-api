import * as userModel from "../models/user.model.js";

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
    if (!req.user) 
      return res.status(401).json({ message: "unauthorized" });
    console.log("Role", req.user.role)
    console.log("User id", uId);
    const convertedUser = await userModel.updateUserRoleToTeacher(uId);
    res.json(convertedUser);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
}
