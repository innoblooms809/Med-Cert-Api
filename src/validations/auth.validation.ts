// validations/userSimpleValidation.ts
import Joi from "joi";

export const simpleRegisterValidation = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    emailId: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};
