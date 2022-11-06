const Joi = require('joi');

exports.signupValidation = 
Joi.object()
    .keys({
        first_name: Joi.string()
                .min(3)
                .max(40)
                .required(),
                
        last_name: Joi.string()
                .min(3)
                .max(40)
                .required(),

        email: Joi.string().email().required(),

        password: Joi.string().min(6).max(15).required()
    });
    

exports.loginValidation = 
Joi.object()
    .keys({
        email: Joi.string().email().required(),

        password: Joi.string().min(6).max(15).required()
    });
    
exports.updateUserValidation = 
Joi.object()
    .keys({
        first_name: Joi.string()
                .min(3)
                .max(40)
                .optional(),
                
        second_name: Joi.string()
                .min(3)
                .max(40)
                .optional(),

        email: Joi.string().email().optional(),

        password: Joi.string().min(6).max(15).optional()
    });