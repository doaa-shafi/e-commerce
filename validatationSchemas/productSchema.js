const Joi=require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const productSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    
    price: Joi.number()
    .required(),

    category: Joi.array().items(Joi.objectId())

})

module.exports={
    productSchema
}