const {getCustomersService,getCustomerService,addAddressService,getCustomerOrdersService}=require('../services/customer')
const {addAddressSchema,isValidObjectId}=require("../config/validationSchema")
const {ac}=require('../config/accessControl');
const ApiError = require("../helpers/ApiError");

const getCustomers = async (req, res,next) => {
  const permission = ac.can(req.role).readAny('customer');
  if (permission.granted) {
    try {
      const customers=await getCustomersService()
      res.status(200).json(customers);
    } catch (error) {
      next(new ApiError(error.message,500))
    }
  } else {
    // resource is forbidden for this user/role
    next(new ApiError('You do not have access',403))
  }
};
const getCustomer = async (req, res,next) => {
  const id  = req.params.id;
  const permission = (ac.can(req.role).readAny('customer'))||(ac.can(req.role).readOwn('customer')&&id===req.id);
  if (permission.granted) {
    if(id && isValidObjectId(id)){
      try {
        const customer=await getCustomerService(id)
        res.status(200).json(customer);
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
const getCustomerOrders = async (req, res,next) => {
  const id  = req.params.id;
  const permission = ac.can(req.role).readAny('order')||(ac.can(req.role).readOwn('order')&& id===req.id);
  if (permission.granted) {
    if(id && isValidObjectId(id)){
      try {
        const orders = await getCustomerOrdersService(id);
        res.status(200).json(orders);
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
const addAddress = async (req, res,next) => {
  const { name, desc } = req.body;
  const id = req.id;
  const permission = ac.can(req.role).updateOwn('customer');
  if (permission.granted) {
    const result=addAddressSchema.validate({ name: name,desc:desc});
    if(result.error){
      next(new ApiError(result.error.details[0].message,400))
    }
    try {
      const user=await addAddressService(name,desc,id)
      res.status(201).json(user);
    } catch (error) {
      next(new ApiError(error.message,500))
    }  
    } else {
    // resource is forbidden for this user/role
    next(new ApiError('You do not have access',403))
  }
  
};

module.exports = {
  getCustomer,
  getCustomers,
  getCustomerOrders,
  addAddress,
};
