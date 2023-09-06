const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const idSchema = Joi.object({
  id: Joi.objectId()
  .required(),
 
})

const page_limitSchema= Joi.object({
  page:Joi.number()
  .required(),

  limit:Joi.number()
  .required(),
})

module.exports={
  idSchema,
  page_limitSchema
}