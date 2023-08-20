const Order = require("../models/order");
const User = require("../models/user");
const Product=require("../models/product")

const getOrdersService = async () => {
  return await Order.find({});
};
const getOrderService = async (id) => {
  return await Order.findById(id);
};
const addToBagService=async(customer,product_id)=>{
  const product=await Product.findById(product_id)
  return await User.findOneAndUpdate(customer, {bag:{
    $push: { products: { product_id } },$inc :{totalPrice: product.price}}})
} 
const createOrderService = async (address,id) => {
  const user = await User.findById(id);
  return await Order.create({
    products: user.bag.products,
    user: user._id,
    totalPrice: user.bag.totalPrice,
    address: address,
  });
};

module.exports = {
  createOrderService,
  getOrdersService,
  getOrderService,
  addToBagService,
};
