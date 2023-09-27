const Joi = require('joi')


const addToCartSchema= Joi.object({
  quantity:Joi.number()
    .positive()
    .integer()
    .required()
    .messages({
      'number.base': `Product quantity should be a 'number'`,
      'number.positive': `Product quantity should be a positive integer`,
      'number.integer': `Product quantity should be a positive integer`,
      'any.required': `Product quantity is required`
    }),
})

module.exports={
    addToCartSchema
}