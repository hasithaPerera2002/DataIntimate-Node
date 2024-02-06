import Item from "../models/item.js";
import asyncHandler from "../handlers/asyncErrorHandler.js";
import CustomerError from "../handlers/customErrorHandler.js";
import {
  createItemRepo,
  deleteItemRepo,
  getAllItemsRepo,
  getOneItemRepo,
  updateItemRepo,
} from "../repo/itemRepo.js";

// Get all items
const getAllItem = asyncHandler(async (req, res, next) => {
  const { page, limit } = req.query;
  const items = await getAllItemsRepo();
  res.json(items);
});

// Get one item
const getOneItem = asyncHandler(async (req, res, next) => {
  const item = await getOneItemRepo(req.params.id);
  if (!item) {
    return next(
      new CustomerError(`Item not found with id of ${req.params.id}`, 404)
    );
  }
  res.json(item);
});

// Create a new item
const createItem = asyncHandler(async (req, res, next) => {
  const item = await createItemRepo(req.body);
  res.status(201).json(item);
});

// Update a item
const updateItem = asyncHandler(async (req, res, next) => {
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
});

// Delete a item
const deleteItem = asyncHandler(async (req, res, next) => {
  await deleteItemRepo(req.params.id).then((result) => {
    res.status(200).json(result);
  });
});

export { getAllItem, getOneItem, createItem, updateItem, deleteItem };
