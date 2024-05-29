import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/cookie.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("user already exist"), 400);

    let hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      email,
      name,
      password: hashedPassword,
    });
    sendCookie(user, res, 200, `registerd successfully`);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("register first"), 400);
    let correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword)
      return next(new ErrorHandler("invalid email or password"), 400);

    sendCookie(user, res, 200, `${user.name}, you are logged in`);
  } catch (error) {
    next(error);
  }
};

export const getProfile = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .cookie("token", null, {
      maxAge: 0,
    })
    .json({
      success: true,
      message: "logged out",
    });
};
