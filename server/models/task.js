import mongoose from "mongoose";

// for storing task we require title, description, isCompleted, user(who submitted)

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

export const Task = new mongoose.model("Task", TaskSchema);
