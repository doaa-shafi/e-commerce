const orderService=require('../services/order')
const {orderAddressSchema}=require("../validatationSchemas/addressSchema")
const {idSchema}=require('../validatationSchemas/idSchema')
const validate=require('../helpers/validate');
const authorize = require("../helpers/authorize");
const {RESOURSES_NAMES,ACTIONS_NAMES}=require('../config/constants')

const getOrders = async (req, res,next) => {
  try {
    authorize(req.role,RESOURSES_NAMES.ORDER,[ACTIONS_NAMES.READ_ANY])
    const orders=await orderService.getOrders()
    res.status(200).json(orders);
  } catch (error) {
    next(error)
  }  
};

const getOrder = async (req, res,next) => {
  const  id = req.params.id;
  try {
    authorize(req.role,RESOURSES_NAMES.ORDER,[ACTIONS_NAMES.READ_ANY])
    validate(idSchema,{id:id})
    const order=await orderService.getOrder(id)
    res.status(200).json(order);
  } catch (error) {
    next(error)
  }  
};
const addToBag=async(req,res,next)=>{
  const product_id=req.params.product_id
  const customer=req.id
  try {
    authorize(req.role,RESOURSES_NAMES.CUSTOMER,[ACTIONS_NAMES.UPDATE_OWN])
    validate(idSchema,{id:product_id})
    const user=await orderService.addToBag(customer,product_id)
    res.status(201).json(user);
  } catch (error) {
    next(error)
  }  
}
const createOrder = async (req, res,next) => {
  const { address } = req.body;
  const id = req.id;
  try {
    authorize(req.role,RESOURSES_NAMES.ORDER,[ACTIONS_NAMES.CREATE_ANY])
    validate(orderAddressSchema,{desc:address})
    const order=await orderService.createOrder(address,id)
    res.status(201).json(order);
  } catch (error) {
    next(error)
  }  
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  addToBag,
};
