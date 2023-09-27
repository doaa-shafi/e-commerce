const productService = require("../services/product");
const { productSchema } = require("../validatationSchemas/productSchema");
const {idSchema,page_limitSchema}=require('../validatationSchemas/id,page,limitSchema')
const validate=require('../helpers/validate');
const authorize = require("../helpers/authorize");
const {RESOURSES_NAMES,ACTIONS_NAMES}=require('../config/constants')

const getProducts = async (req, res,next) => {
  const {page,limit}=req.query
  try {
    authorize(req.role,RESOURSES_NAMES.PRODUCT,[ACTIONS_NAMES.READ_ANY])
    validate(page_limitSchema,{page:page,limit:limit})
    const products=await productService.getProducts(page,limit)
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
  const { name, price ,category} = req.body;
  try {
    authorize(req.role,RESOURSES_NAMES.PRODUCT,[ACTIONS_NAMES.CREATE_ANY])
    validate(productSchema,{ name: name,price:price,category:category})
    const product=await productService.addProduct(name,price,category)
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
