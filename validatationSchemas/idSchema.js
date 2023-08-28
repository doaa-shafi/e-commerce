const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const idSchema = Joi.object({
  id: Joi.objectId()
  .required(),
 
})

module.exports={idSchema}