const User = require("../models/user");
const Order = require("../models/order");

class customerService{

  async getCustomers(){
    return await User.find({});
  }

  async getCustomer(id){
    return await User.findById(id);
  }

  async getCustomerOrders(id){
    return await Order.find({user:id});
  }

  async addAddress(name,desc,id){
    return await User.findOneAndUpdate(id, {
      $push: { addresses: { name: name, desc: desc } },
    },{new: true});
  }
}

module.exports = new customerService()
