const customerService=require('../services/customer')
const {addAddressSchema}=require("../validatationSchemas/addressSchema")
const {idSchema,page_limitSchema}=require('../validatationSchemas/id,page,limitSchema')
const validate=require('../helpers/validate');
const authorize = require("../helpers/authorize");
const {NotFoundError}=require('../helpers/errors')
const {RESOURSES_NAMES,ACTIONS_NAMES}=require('../config/constants')

const getCustomers = async (req, res,next) => {
  const {page,limit}=req.query
  try {
    authorize(req.role,RESOURSES_NAMES.CUSTOMER,[ACTIONS_NAMES.READ_ANY])
    validate(page_limitSchema,{page:page,limit:limit})
    const customers=await customerService.getCustomers(page,limit)
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
    if (customer===null) throw new NotFoundError('This customer does not exist')
    res.status(200).json(customer);
  } catch (error) {
    next(error)
  } 
} 

const showMyCart= async(req,res,next)=>{
  const id  = req.id;
  try {
    authorize(req.role,RESOURSES_NAMES.CUSTOMER,[ACTIONS_NAMES.READ_OWN])
    const customer=await customerService.showMyCart(id)
    res.status(200).json(customer);
  } catch (error) {
    next(error)
  } 
}

const addAddress = async (req, res,next) => {
  const { name, desc } = req.body;
  const id = req.params.id;
  try {
    authorize(req.role,RESOURSES_NAMES.CUSTOMER,[ACTIONS_NAMES.UPDATE_OWN],id===req.id)
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
  showMyCart,
  addAddress,
};
