const Joi=require('joi')

const categorySchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': `Category name should be a type of 'text'`,
            'string.empty': `Category name cannot be empty`,
            'string.min': `Category name should have a minimum length of {#limit}`,
            'string.max': `Category name should have a maximum length of {#limit}`,
            'any.required': `Category name is required`
        }),

})

module.exports={
    categorySchema,
}