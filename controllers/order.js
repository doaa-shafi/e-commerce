const {getOrderService,getOrdersService,createOrderService,addToBagService}=require('../services/order')
const {orderAddressSchema,isValidObjectId}=require("../config/validationSchema")
const {ac}=require('../config/accessControl');
const ApiError = require("../helpers/ApiError");

const getOrders = async (req, res,next) => {
  const permission = ac.can(req.role).readAny('order');
  if (permission.granted) {
    try {
      const orders=await getOrdersService()
      res.status(200).json(orders);
    } catch (error) {
      next(new ApiError(error.message,500))
    }
  } else {
    // resource is forbidden for this user/role
    next(new ApiError('You do not have access',403))
  }
};
const getOrder = async (req, res,next) => {
  const  id = req.params.id;
  const permission = ac.can(req.role).readAny('order');
  if (permission.granted) {
    if(id && isValidObjectId(id)){
      try {
        const order=await getOrderService(id)
        res.status(200).json(order);
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
const addToBag=async(req,res,next)=>{
  const {product_id}=req.body
  const customer=req.id
  const permission = ac.can(req.role).updateOwn('customer');
  if (permission.granted) {
    if(product_id && isValidObjectId(product_id)){
      try {
        const user=await addToBagService(customer,product_id)
        res.status(201).json(user);
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
  
}
const createOrder = async (req, res,next) => {
  const { address } = req.body;
  const id = req.id;
  const permission = ac.can(req.role).createAny('order');
  if (permission.granted) {
    const result=orderAddressSchema.validate({desc:address});
    if(result.error){
      next(new ApiError(result.error.details[0].message,400))
    }
    try {
      const order=await createOrderService(address,id)
      res.status(201).json(order);
    } catch (error) {
      next(new ApiError(error.message,500))
    }  
    } else {
    // resource is forbidden for this user/role
    next(new ApiError('You do not have access',403))
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  addToBag,
};
