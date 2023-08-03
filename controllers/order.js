const Order = require("../models/order");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.status(200).json(orders);
});
const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params.id;
  const order = await Order.findById(id);
  res.status(200).json(order);
});
const createOrder = asyncHandler(async (req, res) => {
  const { address } = req.body;
  const id = req.id;

  if (!address) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findById(id);
  const order = await Order.create({
    products: user.bag.products,
    user: user._id,
    totalPrice: user.bag.totalPrice,
    address: address,
  });
  res.status(201).json(order);
});

module.exports = {
  createOrder,
  getOrders,
  getOrder,
};
