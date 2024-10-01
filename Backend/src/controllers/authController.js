import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateTokenAndCookie } from "../utils/generateToken.js";

// register
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body)

    // All fields are required
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    //valid email
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!isValidEmail.test(email)) {
      return res.status(400).json({ message: "Invalid email", success: false });
    }

    //password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters!",
        success: false,
      });
    }

    // email already exits
    const isEmailExists = await userModel.findOne({ email: email });
    if (isEmailExists) {
      return res
        .status(400)
        .json({ message: "Email already exits!", success: false });
    }

    // username already exits
    const isUsernameExists = await userModel.findOne({ username: username });
    if (isUsernameExists) {
      return res
        .status(400)
        .json({ message: "username already exits!", success: false });
    }

    // valid user save in db
    const encryptedPass = await bcrypt.hash(password, 10);
    const image = "./user.png";
    const newUser = {
      username: username,
      email: email,
      password: encryptedPass,
      image: image,
    };

    const createdUser = await userModel.create(newUser);

    if (createdUser) {
      generateTokenAndCookie(createdUser._id, res);
    }

    return res.status(201).json({
      message: "user register successfully.",
      data: {
        user: { ...createdUser._doc, password: "" },
      },
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! register user!",
      success: false,
    });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // All fields are required
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    // Email not registered
    const verifyUser = await userModel.findOne({ email });
    if (!verifyUser) {
      return res
        .status(400)
        .json({ message: "Email not registered!", success: false });
    }

    // Verify password
    const verifyPass = await bcrypt.compare(password, verifyUser.password);
    if (!verifyPass) {
      return res
        .status(400)
        .json({ message: "Invalid credentials!", success: false });
    }

    // Valid user, generate token and set cookie
    generateTokenAndCookie(verifyUser._id, res);

    return res.status(200).json({
      message: "User logged in successfully.",
      data: { user: { ...verifyUser._doc, password: "" } },
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! Login!",
      success: false,
    });
  }
};

// logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error! logout!",
      success: false,
    });
  }
};
