import { Joi, celebrate, Segments } from 'celebrate';

export const loginValidation = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
});

export const signupValidation = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    username: Joi.string().required()
  })
});
