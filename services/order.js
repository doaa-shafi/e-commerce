const Order = require("../models/order");
const User = require("../models/user");
const Product=require("../models/product")

class orderService{

  async getOrders(page,limit){
    return await Order.find({}).skip(page*(limit-1)).limit(limit);
  }

  async getOrder(id){
    return await Order.findById(id);
  }

  async getCustomerOrders(id){
    return await Order.find({user:id});
  }

  async addToBag(customer,product_id){
    return await User.findByIdAndUpdate(customer, {$push: { bag:  product_id  }},{new: true})
  }

  async createOrder(address,id){
    const user = await User.findById(id);
    const products=await Product.find({ _id: { $in:user.bag} }, { _id: 0 })
    const totalPrice = products.reduce((accumulator, object) => {
      return accumulator + object.price;
    }, 0);
    const order= await Order.create({
      products: products,
      user: user._id,
      totalPrice: totalPrice,
      address: address,
    });
    await User.findByIdAndUpdate(id,{bag:[]})
    return order
  }
}

module.exports = new orderService()