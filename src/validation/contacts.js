import Joi from "joi";


export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phoneNumber: Joi.number().integer().min(6).max(16).required(),
    email: Joi.string().min(3).max(30),
    isFavourite: Joi.bool(),
    contactType: Joi.string().valid("work", "home", "personal").required(),
    
});

export const updateContactSchema = Joi.object({
     name: Joi.string().min(3).max(30),
    phoneNumber: Joi.number().integer().min(6).max(16),
    email: Joi.string().min(3).max(30),
    isFavourite: Joi.bool(),
    contactType: Joi.string().valid("work", "home", "personal"),
});