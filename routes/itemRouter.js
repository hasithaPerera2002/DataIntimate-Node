import express from "express";
import verifyToken from "../middleware/authMiddleware";
const router = express.Router();
import {
  createItem,
  updateItem,
  deleteItem,
  getAllItem,
  getOneItem,
} from "../controllers/itemController";

router.route("/").get(verifyToken, getAllItem).post(verifyToken, createItem);
router
  .route("/:id")
  .get(verifyToken, getOneItem)
  .put(verifyToken, updateItem)
  .delete(verifyToken, deleteItem);

export default itemRouter;
