const Product = require("../models/product");
const Category= require("../models/category")
const {ValidationError}=require('../helpers/errors')

class productService{

  async getProducts(page,limit){
    return await Product.find({}).skip(limit*(page-1)).limit(limit);
  }

  async getProduct(id){
    return await Product.findById(id);
  }

  async addProduct(name,price,category){
    const categories=await Category.find({ _id : { $in : category} })
    if(categories.length!==category.length) throw new ValidationError("Cannot add a category that does not exist")
    return await Product.create({
      name: name,
      price:price,
      category:category
    });
  }
}

module.exports = new productService()
