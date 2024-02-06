import express from "express";
import mongoose from "mongoose";
import env from "dotenv";

env.config();

const app = express();

mongoose.connect("mongodb://localhost:27017/dataIntimate", {}).then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});

app.use(express.json());
app.use(globalErrorHandler);
