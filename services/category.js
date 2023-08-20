const Category = require("../models/category");

const getCategoriesService = async () => {
  return await Category.find({});
};
const getCategoryService = async (id) => {
  return await Category.findById(id);
};

const addCategoryService = async (name) => {
  return await Category.create({
    name: name,
  });
};

module.exports = {
    getCategoriesService,
    getCategoryService,
    addCategoryService,
};
