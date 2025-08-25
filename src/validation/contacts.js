import Joi from "joi";
import { isValidObjectId } from "mongoose";


export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phoneNumber: Joi.string().pattern(/^[0-9]+$/).min(6).max(16).required(),
    email: Joi.string().min(3).max(30),
    isFavourite: Joi.bool(),
    contactType: Joi.string().valid("work", "home", "personal").required(),
    parentId: Joi.string().custom((value, helper) => {
        if (value && !isValidObjectId(value)) {
            return helper.message('Parent id should be a valid mongo id');
        }
        return true;
    }),
});

export const updateContactSchema = Joi.object({
     name: Joi.string().min(3).max(30),
    phoneNumber: Joi.string().pattern(/^[0-9]+$/).min(6).max(16).required(),
    email: Joi.string().min(3).max(30),
    isFavourite: Joi.bool(),
    contactType: Joi.string().valid("work", "home", "personal"),
});