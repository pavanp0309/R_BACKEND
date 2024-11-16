import User from "../models/User.js";
import bcrypt from "bcrypt";

// function to create users
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // to check if the user already exists or not
    let existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ messsage: "user already exists" });

    // to make the password secure we are using bycripting  module to hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // creating the newuser in the usercollection with hashed password
    let newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
    });

    // saving the user in database
    await newUser.save();
    res
      .status(201)
      .json({ message: "userCreated successfully", user: newUser });
  } catch (error) {
    console.log("error in creating the user", error.message);

    //   creating the response status for failure of the user
    res.status(500).json({ message: "error in creating the user" });
  }
};

// function to getusers
export const getUsers = async (req, res) => {
  try {
    // find method is used for reteriving single and many documnets in mongodb
    const users = await User.find()
    // reading the data in paressed format with status code
    res.status(200).json(users);

  } catch (error) {
    console.log("error in getting the user", error.message);

    //   creating the response status for failure of the order
    res.status(500).json({ message: "error in getting the user" });
  }
};

// function to getusersByID
export const getUsersById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    // if product is not found
    if (!user) return res.status(404).json({ message: "cant find a user" });
    // reading the data in paresed format with status code
    res.status(200).json(user);
  } catch (error) {
    console.log("error in getting the user", error.message);

    //   creating the response status for failure of the order
    res.status(500).json({ message: "error in getting the user" });
  }
};

// function to UpdateusersById
export const updateUsers = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{ new: true })
    if (!updatedUser)
      return res.status(404).json({ message: "error find the User" });
    res.status(200).json(updatedUser);
  } catch (error) {
    //   creating the response status for failure of the order
    res.status(500).json({ message: "error in updating the User" });
  }
};

// function To delete users
export const deleteUsers = async (req, res) => {
  try {
    let deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "error find the User" });
     res.status(200).json({ message: "successfully deleted User" });
  } catch (error) {
    //   creating the response status for failure of the order
    res.status(500).json({ message: "error in deleting the user" });
  }
};
