const User = require("../models/user");
const Order = require("../models/order");
const asyncHandler = require("express-async-handler");

const getCustomers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});
const getCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params.id;
  const user = await User.findById(id);
  res.status(200).json(user);
});
const getCustomerOrders = asyncHandler(async (req, res) => {
  const id  = req.id;
  const orders = await Order.find({user:id});
  res.status(200).json(orders);
});
const addAddress = asyncHandler(async (req, res) => {
  const { name, desc } = req.body;
  const id = req.id;

  if (!name || !desc) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user= await User.findOneAndUpdate(id, {
    $push: { addresses: { name: name, desc: desc } },
  });
  res.status(201).json(user)
});

module.exports = {
  getCustomer,
  getCustomers,
  getCustomerOrders,
  addAddress,
};
