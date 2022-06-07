import Joi from 'joi';

const authLoginValidation = (reqBody: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(32),
  });
  return schema.validate(reqBody);
};

export default { authLoginValidation };
