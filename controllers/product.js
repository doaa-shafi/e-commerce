const { isValidObjectId,productSchema } = require("../config/validationSchema");
const {getProductService,getProductsService,addProductService} = require("../services/product");
const {ac}=require('../config/accessControl')
const ApiError = require("../helpers/ApiError");

const getProducts = async (req, res) => {
  const permission = ac.can(req.role).readAny('product');
  if (permission.granted) {
    try {
      const products=await getProductsService()
      res.status(200).json(products);
    } catch (error) {
      next(new ApiError(error.message,500))
    }
  } else {
    // resource is forbidden for this user/role
    next(new ApiError('You do not have access',403))
  }
};
const getProduct = async (req, res) => {
  const  id  = req.params.id;
  const permission = ac.can(req.role).readAny('product');
  if (permission.granted) {
    if(id && isValidObjectId(id)){
      try {
        const product=await getProductService(id)
        res.status(200).json(product);
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

const addProduct = async (req, res) => {
  const { name, price } = req.body;
  const permission = ac.can(req.role).createAny('product');
  if (permission.granted) {
    const result=productSchema.validate({ name: name,price:price});
    if(result.error){
      next(new ApiError(result.error.details[0].message,400))
    }
    try {
      const product=await addProductService(name,price)
      res.status(201).json(product);
    } catch (error) {
      next(new ApiError(error.message,500))
    }
    
  } else {
    // resource is forbidden for this user/role
    next(new ApiError('You do not have access',403))
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
};
