import express from "express";
import env from "dotenv";
import userRouter from "./routes/userRouter.js";
import itemRouter from "./routes/itemRouter.js";
import globalErrorHandler from "./handlers/globalErrorHandler.js";

env.config();

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use(express.json());
app.use(globalErrorHandler); //`globalErrorHandler` is a middleware that handles all errors
app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  process.exit(1);
});

export default app;
