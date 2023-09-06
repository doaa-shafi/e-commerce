const Product = require("../models/product");

class productService{

  async getProducts(page,limit){
    return await Product.find({}).skip(page*(limit-1)).limit(limit);
  }

  async getProduct(id){
    return await Product.findById(id);
  }

  async addProduct(name,price,category){
    return await Product.create({
      name: name,
      price:price,
      category:category
    });
  }
}

module.exports = new productService()
