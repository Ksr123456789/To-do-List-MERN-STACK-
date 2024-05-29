import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { sendCookie } from "../utils/cookie.js";
import { getProfile, login, logout, register } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Router();

router.post(`/new`, register);

router.post(`/login`, login);

router.get(`/profile`, isAuthenticated, getProfile);

router.get(`/logout`, isAuthenticated, logout);

export default router;
