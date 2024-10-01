import jwt from "jsonwebtoken";
import constant from "../config/constant.js";

export const generateTokenAndCookie = (userId, res) => {
  const token = jwt.sign({ userId }, constant.JWT_SECRET_KEY, {
    expiresIn: "10d",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // for security purpose
    sameSite: "strict",
    secure: constant.NODE_ENV !== "development",
  });

  return token;
};
