import { Request, Response, NextFunction } from 'express';
import newUser from '../validation/createUserValidation';

const checkBody = (req: Request, res: Response, next: NextFunction) => {
  const { error } = newUser.createUserValidation(req.body);
  const errorPath = error?.details[0].path;
  if (
    error?.details[0].message === `\"confirmPassword\" must be [ref:password]`
  ) {
    return res.status(500).json({
      path: errorPath,
      message: 'confirm password must be the same as password',
    });
  }
  if (error) {
    return res
      .status(500)
      .json({ path: errorPath, message: error.details[0].message });
  }
  return next();
};

export default { checkBody };
