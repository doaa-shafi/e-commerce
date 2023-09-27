const orderService=require('../services/order')
const {orderAddressSchema}=require("../validatationSchemas/addressSchema")
const {idSchema,page_limitSchema}=require('../validatationSchemas/id,page,limitSchema')
const validate=require('../helpers/validate');
const authorize = require("../helpers/authorize");
const {RESOURSES_NAMES,ACTIONS_NAMES}=require('../config/constants');
const { addToCartSchema } = require('../validatationSchemas/orderScema');

const getOrders = async (req, res,next) => {
  const {page,limit}=req.query
  try {
    authorize(req.role,RESOURSES_NAMES.ORDER,[ACTIONS_NAMES.READ_ANY])
    validate(page_limitSchema,{page:page,limit:limit})
    const orders=await orderService.getOrders(page,limit)
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

const getCustomerOrders = async (req, res,next) => {
  const id  = req.params.id;
  try {
    authorize(req.role,RESOURSES_NAMES.ORDER,[ACTIONS_NAMES.READ_ANY,ACTIONS_NAMES.READ_OWN],id===req.id)
    validate(idSchema,{id:id})
    const orders = await orderService.getCustomerOrders(id);
    res.status(200).json(orders);
  } catch (error) {
    next(error)
  } 
};

const addToCart=async(req,res,next)=>{
  const {product_id,quantity}=req.body
  const customer=req.id
  try {
    authorize(req.role,RESOURSES_NAMES.CUSTOMER,[ACTIONS_NAMES.UPDATE_OWN])
    validate(idSchema,{id:product_id})
    validate(addToCartSchema,{quantity:quantity})
    const result=await orderService.addToCart(customer,product_id,quantity)
    res.status(201).json(result);
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
    const result=await orderService.createOrder(address,id)
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }  
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  getCustomerOrders,
  addToCart,
};
