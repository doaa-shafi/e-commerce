const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

CategorySchema.plugin(uniqueValidator, { message: 'Category {PATH} must be unique.' });

module.exports = mongoose.model("Category", CategorySchema);
