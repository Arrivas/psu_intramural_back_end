import Joi from 'joi';

const createUserValidation = (reqBody: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(32),
    confirmPassword: Joi.ref('password'),
  });
  return schema.validate(reqBody);
};

export default { createUserValidation };
