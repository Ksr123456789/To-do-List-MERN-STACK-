import jwt from "jsonwebtoken";

export const sendCookie = (user, res, statusCode = 200, message) => {
  let token = jwt.sign({ id: user._id }, `${process.env.JWT_TOKEN}`);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message,
    });
};
