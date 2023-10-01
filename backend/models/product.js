const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

ProductSchema.plugin(uniqueValidator, { message: 'Product {PATH} must be unique.' });

module.exports = mongoose.model("Product", ProductSchema);
