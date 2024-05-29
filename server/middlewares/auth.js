import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import ErrorHandler from "./error.js";

export const isAuthenticated = async (req, res, next) => {
  let { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("login first"), 400);
  }
  let decode = jwt.verify(token, `${process.env.JWT_TOKEN}`);
  req.user = await User.findById(decode.id);
  next();
};
