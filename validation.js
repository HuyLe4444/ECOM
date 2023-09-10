const Joi = require('joi');


registerValidation = (data) => {
    const Schema = Joi.object({
        username: Joi.string()
                .required()
                .min(6),
        email: Joi.string()
                .email()
                .min(6),
        password: Joi.string()
                .required()
                .min(6)
    })
    return Schema.validate(data);
}

loginValidation = (data) => {
    const Schema = Joi.object({
        email: Joi.string()
                .email()
                .min(6),
        password: Joi.string()
                .required()
                .min(6)
    })
    return Schema.validate(data);
}

productValidation = (data) => {
    const Schema = Joi.object({
        title: Joi.string()
                .required()
                .min(6),
        desc: Joi.string()
                .required(),
        // img:
        categories: Joi.array(),
        size: Joi.string(),
        color: Joi.string(),
        price: Joi.number()
                .required()
    })
    return Schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.productValidation = productValidation;

