import express from "express";
import verifyToken from "../middleware/authMiddleware";
const router = express.Router();
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  login,
  getOneUser,
} from "../controllers/userController";

router.route("/").get(getAllUser).post(createUser);
router
  .route("/:id")
  .get(getOneUser)
  .put(verifyToken, updateUser) //`verifyToken` is a middleware that checks if the user is authorized
  .delete(deleteUser);
router.route("/login").post(login);

export default userRouter;
