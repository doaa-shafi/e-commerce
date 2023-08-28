const productService = require("../services/product");
const { productSchema } = require("../validatationSchemas/productSchema");
const {idSchema}=require('../validatationSchemas/idSchema')
const validate=require('../helpers/validate');
const authorize = require("../helpers/authorize");
const {RESOURSES_NAMES,ACTIONS_NAMES}=require('../config/constants')

const getProducts = async (req, res,next) => {
  try {
    authorize(req.role,RESOURSES_NAMES.PRODUCT,[ACTIONS_NAMES.READ_ANY])
    const products=await productService.getProducts()
    res.status(200).json(products);
  } catch (error) {
    next(error)
  }  
};
const getProduct = async (req, res,next) => {
  const  id  = req.params.id;
  try {
    authorize(req.role,RESOURSES_NAMES.PRODUCT,[ACTIONS_NAMES.READ_ANY])
    validate(idSchema,{id:id})
    const product=await productService.getProduct(id)
    res.status(200).json(product);
  } catch (error) {
    next(error)
  }  
};

const addProduct = async (req, res,next) => {
  const { name, price } = req.body;
  try {
    authorize(req.role,RESOURSES_NAMES.PRODUCT,[ACTIONS_NAMES.CREATE_ANY])
    validate(productSchema,{ name: name,price:price})
    const product=await productService.addProduct(name,price)
    res.status(201).json(product);
  } catch (error) {
    next(error)
  }  
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
};
