const Category = require("../models/category");

class categoryService{

  async getCategories(){
    return await Category.find({});
  }

  async getCategory(id){
    return await Category.findById(id);
  }

  async addCategory(name){
    return await Category.create({
      name: name,
    });
  }
}

module.exports = new categoryService()
