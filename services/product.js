const Product = require("../models/product");

class productService{

  async getProducts(){
    return await Product.find({});
  }

  async getProduct(id){
    return await Product.findById(id);
  }

  async addProduct(name,price){
    return await Product.create({
      name: name,
      price:price
    });
  }
}

module.exports = new productService()
