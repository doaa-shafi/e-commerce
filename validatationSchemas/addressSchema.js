const Joi=require('joi')

const addressSchema=Joi.object({
    name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .messages({
        'string.base': `Address name should be a type of 'text'`,
        'string.empty': `Address name cannot be empty`,
        'string.min': `Address name should have a minimum length of {#limit}`,
        'string.max': `Address name should have a maximum length of {#limit}`,
        'any.required': `Address name is required`
    }),

    desc: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .messages({
        'string.base': `Address description should be a type of 'text'`,
        'string.empty': `Address description cannot be empty`,
        'string.min': `Address description should have a minimum length of {#limit}`,
        'string.max': `Address description should have a maximum length of {#limit}`,
        'any.required': `Address description is required`
    }),
})
const addAddressSchema = addressSchema.fork(['name','desc'], (schema) => schema.required());
const orderAddressSchema = addressSchema.fork(['desc'], (schema) => schema.required());

module.exports={
    addAddressSchema,
    orderAddressSchema
}