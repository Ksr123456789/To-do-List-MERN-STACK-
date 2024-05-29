import { Task } from "../models/task.js";
import { Router } from "express";
import jwt from "jsonwebtoken";
import {
  addTask,
  deleteTask,
  getTasks,
  ToggleTask,
  updateTask,
} from "../controller/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Router();

router.post(`/add`, isAuthenticated, addTask);

router.get(`/getTasks`, isAuthenticated, getTasks);

router
  .route(`/:id`)
  .put(isAuthenticated, ToggleTask)
  .delete(isAuthenticated, deleteTask);

router.put("/update/:id", isAuthenticated, updateTask);

export default router;
