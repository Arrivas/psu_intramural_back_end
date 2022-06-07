import { Request, Response, NextFunction } from 'express';
import auth from '../validation/authValidation';

const checkBody = (req: Request, res: Response, next: NextFunction) => {
  const { error } = auth.authLoginValidation(req.body);
  const errorPath = error?.details[0].path;

  if (error) {
    return res
      .status(500)
      .json({ path: errorPath, message: error.details[0].message });
  }
  return next();
};

export default { checkBody };
