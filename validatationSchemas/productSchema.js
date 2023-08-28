const Joi=require('joi')

const productSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    
    price: Joi.number()
    .required(),

})

module.exports={
    productSchema
}