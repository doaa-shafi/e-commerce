const {getCategoriesService,getCategoryService,addCategoryService} = require("../services/category");
const {categorySchema,isValidObjectId}=require("../config/validationSchema")
const {ac}=require('../config/accessControl');
const ApiError = require("../helpers/ApiError");

const getCategories = async (req, res,next) => {
  const permission = ac.can(req.role).readAny('category');
  if (permission.granted) {
    try {
      const categories=await getCategoriesService()
      res.status(200).json(categories);
    } catch (error) {
      next(new ApiError(error.message,500))
    }
  } else {
    // resource is forbidden for this user/role
    next(new ApiError('You do not have access',403))
  }
};
const getCategory = async (req, res,next) => {
  const  id  = req.params.id;
  const permission = ac.can(req.role).readAny('category');
  if (permission.granted) {
    if(id && isValidObjectId(id)){
      try {
        const category=await getCategoryService(id)
        res.status(200).json(category);
      } catch (error) {
        next(new ApiError(error.message,500))
      }
      
    }else{
      next(new ApiError("Invalid ID",400))
    }
    
  } else {
    // resource is forbidden for this user/role
    next(new ApiError('You do not have access',403))
  }
};

const addCategory = async (req, res,next) => {
  const { name } = req.body;
  const permission = ac.can(req.role).createAny('category');
  if (permission.granted) {
    const result=categorySchema.validate({ name: name});
    if(result.error){
      next(new ApiError(result.error.details[0].message,400))
    }
    try {
      const category=await addCategoryService(name)
      res.status(201).json(category);
    } catch (error) {
      next(new ApiError(error.message,500))
    }  
    } else {
    // resource is forbidden for this user/role
    next(new ApiError('You do not have access',403))
  }
};

module.exports = {
  getCategories,
  getCategory,
  addCategory,
};
