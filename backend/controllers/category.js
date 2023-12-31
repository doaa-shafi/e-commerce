const categoryService = require("../services/category");
const {categorySchema}=require("../validatationSchemas/categorySchema")
const {idSchema,page_limitSchema}=require('../validatationSchemas/id,page,limitSchema')
const validate=require('../helpers/validate');
const authorize = require("../helpers/authorize");
const {NotFoundError}=require('../helpers/errors')
const {RESOURSES_NAMES,ACTIONS_NAMES}=require('../config/constants')

const getCategories = async (req, res,next) => {
  const{page,limit}=req.query
  try {
    authorize(req.role,RESOURSES_NAMES.CATEGORY,[ACTIONS_NAMES.READ_ANY])
    validate(page_limitSchema,{page:page,limit:limit})
    const categories=await categoryService.getCategories(page,limit)
    res.status(200).json(categories);
  } catch (error) {
    next(error)
  }  
};
const getCategory = async (req, res,next) => {
  const  id  = req.params.id;
  try {
    authorize(req.role,RESOURSES_NAMES.CATEGORY,[ACTIONS_NAMES.READ_ANY])
    validate(idSchema,{id:id})
    const category=await categoryService.getCategory(id)
    if (category===null) throw new NotFoundError('This category does not exist')
    res.status(200).json(category);
  } catch (error) {
    next(error)
  }  
  
};

const addCategory = async (req, res,next) => {
  const { name } = req.body;
  try {
    authorize(req.role,RESOURSES_NAMES.CATEGORY,[ACTIONS_NAMES.CREATE_ANY])
    validate(categorySchema,{name:name})
    const category=await categoryService.addCategory(name)
    res.status(201).json(category);
  } catch (error) {
    next(error)
  }  
    
};

module.exports = {
  getCategories,
  getCategory,
  addCategory,
};
