const Joi=require('joi')

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

module.exports={
    signupSchema,
    loginSchema
}