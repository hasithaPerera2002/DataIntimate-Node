import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    validator: {
      validator: function (v) {
        return v >= 0;
      },
      message: "Price must be greater than or equal to 0",
    },
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    validator: {
      validator: function (v) {
        return v >= 0;
      },
      message: "Quantity must be greater than or equal to 0",
    },
  },
});
const Item = mongoose.model("Item", itemSchema);
export default Item;
