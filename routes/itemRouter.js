import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
const itemRouter = express.Router();
import {
  createItem,
  updateItem,
  deleteItem,
  getAllItem,
  getOneItem,
} from "../controllers/itemController.js";

itemRouter
  .route("/")
  .get(verifyToken, getAllItem)
  .post(verifyToken, createItem);
itemRouter
  .route("/:id")
  .get(verifyToken, getOneItem)
  .put(verifyToken, updateItem)
  .delete(verifyToken, deleteItem);

export default itemRouter;
