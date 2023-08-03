const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params.id;
  const product = await Product.findById(id);
  res.status(200).json(product);
});

const addProduct = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  const product = await Product.create({
    name: name,
    price: price,
  });
  res.status(201).json(product);
});

module.exports = {
  getProducts,
  getProduct,
  addProduct,
};
