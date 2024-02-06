import Item from "../models/itemModel.js";
import asyncHandler from "../handlers/asyncErrorHandler.js";
import CustomerError from "../handlers/customErrorHandler.js";

const getAllItem = asyncHandler(async (req, res, next) => {
  const { page, limit } = req.query;
  const items = await Item.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
  res.json(items);
});

const getOneItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return next(
      new CustomerError(`Item not found with id of ${req.params.id}`, 404)
    );
  }
  res.json(item);
});

const createItem = asyncHandler(async (req, res, next) => {
  const item = await Item.create(req.body);
  res.status(201).json(item);
});

const updateItem = asyncHandler(async (req, res, next) => {
  await Item.updateOne({ _id: req.params.id }, { $set: req.body }).then(
    (result) => {
      res.status(200).json(result);
    }
  );
});

const deleteItem = asyncHandler(async (req, res, next) => {
  await Item.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json(result);
  });
});

export { getAllItem, getOneItem, createItem, updateItem, deleteItem };
