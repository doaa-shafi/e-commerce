const Product = require("../models/product");

const getProductsService = async () => {
  return await Product.find({});
};
const getProductService = async (id) => {
  return await Product.findById(id);
};

const addProductService = async (name,price) => {
  return await Product.create({
    name: name,
    price: price,
  });
};

module.exports = {
  getProductsService,
  getProductService,
  addProductService,
};
