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
