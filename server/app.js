import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import { config } from "dotenv";

config({
  path: "./config/config.env",
});

mongoose
  .connect(`${process.env.MONGO_URL}`, {
    dbName: "todos",
  })
  .then(() => console.log(`db connected`))
  .catch((e) => console.log(e));

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`, // Allow requests from this origin
  credentials: true, // Allow including credentials
};

app.use(cors(corsOptions));

app.use(`/api/v1/user`, userRouter);
app.use(`/api/v1/task`, taskRouter);

//using error middleware
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`server is on`);
});
