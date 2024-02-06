import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
const userRouter = express.Router();
import {
  addUser,
  updateUser,
  deleteUser,
  getAllUser,
  login,
  getOneUser,
} from "../controllers/userController.js";

userRouter.route("/").get(getAllUser).post(addUser);
userRouter
  .route("/:id")
  .get(getOneUser)
  .put(verifyToken, updateUser) //`verifyToken` is a middleware that checks if the user is authorized
  .delete(deleteUser);
userRouter.route("/login").post(login);
userRouter.route("/test").get((req, res) => {
  res.send("Test route reached successfully!");
});
export default userRouter;
