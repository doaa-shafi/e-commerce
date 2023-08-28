const customerService=require('../services/customer')
const {addAddressSchema}=require("../validatationSchemas/addressSchema")
const {idSchema}=require('../validatationSchemas/idSchema')
const validate=require('../helpers/validate');
const authorize = require("../helpers/authorize");
const {RESOURSES_NAMES,ACTIONS_NAMES}=require('../config/constants')

const getCustomers = async (req, res,next) => {
  try {
    authorize(req.role,RESOURSES_NAMES.CUSTOMER,[ACTIONS_NAMES.READ_ANY])
    const customers=await customerService.getCustomers()
    res.status(200).json(customers);
  } catch (error) {
    next(error)
  }  
};
const getCustomer = async (req, res,next) => {
  const id  = req.params.id;
  try {
    authorize(req.role,RESOURSES_NAMES.CUSTOMER,[ACTIONS_NAMES.READ_ANY,ACTIONS_NAMES.READ_OWN],id===req.id)
    validate(idSchema,{id:id})
    const customer=await customerService.getCustomer(id)
    res.status(200).json(customer);
  } catch (error) {
    next(error)
  } 
} 
  
const getCustomerOrders = async (req, res,next) => {
  const id  = req.params.id;
  try {
    authorize(req.role,RESOURSES_NAMES.ORDER,[ACTIONS_NAMES.READ_ANY,ACTIONS_NAMES.READ_OWN],id===req.id)
    validate(idSchema,{id:id})
    const orders = await customerService.getCustomerOrders(id);
    res.status(200).json(orders);
  } catch (error) {
    next(error)
  } 
};
const addAddress = async (req, res,next) => {
  const { name, desc } = req.body;
  const id = req.id;
  try {
    authorize(req.role,RESOURSES_NAMES.CUSTOMER,[ACTIONS_NAMES.UPDATE_OWN])
    validate(addAddressSchema,{ name: name,desc:desc})
    const user=await customerService.addAddress(name,desc,id)
    res.status(201).json(user);
  } catch (error) {
    next(error)
  }  
};

module.exports = {
  getCustomer,
  getCustomers,
  getCustomerOrders,
  addAddress,
};
