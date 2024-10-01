import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import constant from "../config/constant.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    console.log("hhhhhh");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized! login required!", success: false });
    }

    const decoded = jwt.verify(token, constant.JWT_SECRET_KEY);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized! Invalid Token!", success: false });
    }

    const user = await userModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found!", success: false });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized!", success: false });
  }
};
