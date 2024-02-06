import Item from "../models/item.js";
import CustomerError from "../handlers/customErrorHandler.js";
import {
  createItemRepo,
  deleteItemRepo,
  getAllItemsRepo,
  getOneItemRepo,
  updateItemRepo,
} from "../repo/itemRepo.js";

// Get all items
const getAllItem = async (req, res, next) => {
  const { page, limit } = req.query;
  const items = await getAllItemsRepo();
  res.json(items);
};

// Get one item
const getOneItem = async (req, res, next) => {
  const item = await getOneItemRepo(req.params.id);
  if (!item) {
    res.json(
      new CustomerError(`Item not found with id of ${req.params.id}`, 404)
    );
  }
  res.json(item);
};

// Create a new item
const createItem = async (req, res, next) => {
  const item = await createItemRepo(req.body);
  res.status(201).json(item);
};

// Update a item
const updateItem = async (req, res, next) => {
  await updateItemRepo(
    new Item(
      req.body.name,
      req.body.price,
      req.body.description,
      req.body.quantity
    )
  ).then((result) => {
    res.status(200).json(result);
  });
};

// Delete a item
const deleteItem = async (req, res, next) => {
  await deleteItemRepo(req.params.id).then((result) => {
    res.status(200).json(result);
  });
};

export { getAllItem, getOneItem, createItem, updateItem, deleteItem };
