const Order = require("../models/order");
const User = require("../models/user");
const Product=require("../models/product")

class orderService{

  async getOrders(){
    return await Order.find({});
  }

  async getOrder(id){
    return await Order.findById(id);
  }

  async addToBagService(customer,product_id){
    const product=await Product.findById(product_id)
    const user= await User.findById(customer)
    user.bag.products.push(product_id)
    user.bag.totalPrice=user.bag.totalPrice+product.price
    return await User.findByIdAndUpdate(customer, {bag:user.bag},{new: true})
    // return await User.findByIdAndUpdate(customer, {bag:{
    //   $push: { products: { product_id } },$inc :{totalPrice: product.price}}})
  }

  async createOrder(address,id){
    const user = await User.findById(id);
    const order= await Order.create({
      products: user.bag.products,
      user: user._id,
      totalPrice: user.bag.totalPrice,
      address: address,
    });
    await User.findByIdAndUpdate(id,{bag:{products:[],totalPrice:0}})
    return order
  }
}

module.exports = new orderService()