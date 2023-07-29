const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
});
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const category = await Category.findById(id);
  res.status(200).json(category);
});

const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({
    name: name,
  });
  res.status(201).json(category);
});

module.exports = {
  getCategories,
  getCategory,
  addCategory,
};
