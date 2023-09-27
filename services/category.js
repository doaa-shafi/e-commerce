const Category = require("../models/category");

class categoryService{

  async getCategories(page,limit){
    return await Category.find({}).skip(limit*(page-1)).limit(limit);
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
