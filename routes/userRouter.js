import express from "express";
import verifyToken from "../middleware/authMiddleware";
const router = express.Router();
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  getOneUser,
} from "../controllers/userController";

router.route("/").get(getAllUser).post(createUser);
router
  .route("/:id")
  .get(getOneUser)
  .put(verifyToken, updateUser)
  .delete(deleteUser);
router.route("/login").post(login);

export default router;
