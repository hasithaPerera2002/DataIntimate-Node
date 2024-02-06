import express from "express";
const router = express.Router();
import {
  createItem,
  updateItem,
  deleteItem,
  getAllItem,
  getOneItem,
} from "../controllers/itemController";

router.route("/").get(getAllItem).post(createItem);
router.route("/:id").get(getOneItem).put(updateItem).delete(deleteItem);

export default router;
