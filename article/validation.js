const Joi = require('joi');

exports.createArticleValidation = 
Joi.object()
    .keys({
        title: Joi.string()
                .min(3)
                .max(40)
                .required(),
                
        description: Joi.string()
                .min(3)
                .max(400),

        tags: Joi.array().items(Joi.string()).required(),

        body: Joi.string().min(20).required()
    });
    
exports.updateArticleValidation = 
Joi.object()
    .keys({
        title: Joi.string()
                .min(3)
                .max(40)
                .optional(),
                
        description: Joi.string()
                .min(3)
                .max(400).optional(),

        tags: Joi.array().items(Joi.string()).optional(),

        body: Joi.string().min(20).optional(),

        state: Joi.string().valid('draft', 'published')
    });