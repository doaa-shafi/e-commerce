const Joi=require('joi')

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

module.exports={
    addAddressSchema,
    orderAddressSchema
}