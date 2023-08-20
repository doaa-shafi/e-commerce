const User = require("../models/user");
const Order = require("../models/order");


const getCustomersService = async () => {
  return await User.find({});
  
};
const getCustomerService = async (id) => {
  return await User.findById(id);
};
const getCustomerOrdersService = async (id) => {
  return await Order.find({user:id});
};
const addAddressService = async (name,desc,id) => {
  return await User.findOneAndUpdate(id, {
    $push: { addresses: { name: name, desc: desc } },
  });
};

module.exports = {
  getCustomerService,
  getCustomersService,
  getCustomerOrdersService,
  addAddressService,
};
