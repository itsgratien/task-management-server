import { Joi, celebrate, Segments } from 'celebrate';

export const editProfileValidation = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().allow('', null).min(6),
    username: Joi.string().required()
  })
});
