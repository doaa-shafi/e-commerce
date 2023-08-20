const Joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

function isValidObjectId(id){
     
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;       
        return false;
    }
    console.log('koko')
    return false;
}
const userSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    confirm_password: Joi.ref('password'),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

})
const signupSchema = userSchema.fork(['username', 'email', 'confirm_password', 'password'], (schema) => schema.required());
const loginSchema = userSchema.fork(['username', 'password'], (schema) => schema.required());

const addressSchema=Joi.object({
    name: Joi.string()
    .alphanum()
    .min(3)
    .max(30),

    desc: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
})
const addAddressSchema = addressSchema.fork(['name','desc'], (schema) => schema.required());
const orderAddressSchema = addressSchema.fork(['desc'], (schema) => schema.required());

const productSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    
    price: Joi.number()
    .required(),

})
const categorySchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

})

module.exports= {
    isValidObjectId,
    userSchema,
    loginSchema,
    signupSchema,
    addressSchema,
    addAddressSchema,
    orderAddressSchema,
    productSchema,
    categorySchema
}