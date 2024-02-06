import express from "express";
import env from "dotenv";
import userRouter from "./routes/userRouter";
import itemRouter from "./routes/itemRouter";
import globalErrorHandler from "./handlers/globalErrorHandler";

env.config();

const app = express();

app.use(express.json());

app.use(globalErrorHandler); //`globalErrorHandler` is a middleware that handles all errors
app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  //
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  process.exit(1);
});

export default app;
