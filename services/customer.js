const User = require("../models/user");
const Product=require('../models/product')

class customerService{

  async getCustomers(page,limit){
    return await User.find({}).skip(page*(limit-1)).limit(limit);
  }

  async getCustomer(id){
    return await User.findById(id);
  }

  async showMyBag(id){
    const user = await User.findById(id);
    const products=await Product.find({ _id: { $in:user.bag} }, { _id: 0 })
    const totalPrice = products.reduce((accumulator, object) => {
      return accumulator + object.price;
    }, 0);
    return {products,totalPrice};
  }

  async addAddress(name,desc,id){
    return await User.findByIdAndUpdate(id, {
      $push: { addresses: { name: name, desc: desc } },
    },{new: true});
  }
}

module.exports = new customerService()
