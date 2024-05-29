import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";
import jwt from "jsonwebtoken";

export const addTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    console.log(req.user);
    await Task.create({
      title,
      description,
      user: req.user, //when you assign a Mongoose document (such as a user object) to a field that expects an ObjectId, Mongoose will automatically store only the _id property. This is why you see only the ObjectId stored in the user field of the Task document
    });
    res.status(201).json({
      success: true,
      message: "task added",
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    let userId = req.user._id;
    let tasks = await Task.find({ user: userId });

    res.status(200).json({
      success: true,
      message: "task added",
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const ToggleTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("task not found"), 404);

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated",
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!task) return next(new ErrorHandler("task not found"), 404);

    res.status(201).json({
      success: true,
      message: "task updated",
    });
  } catch (error) {}
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) return next(new ErrorHandler("task not found", 404));

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    next(error);
  }
};
