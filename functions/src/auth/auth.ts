import { Request, Response, NextFunction } from 'express';
import { firebase } from '../config/firebase';

const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => data.user?.getIdToken())
    .then((token) => res.json({ token }))
    .catch((err) => {
      if (err.code === 'auth/wrong-password') {
        return res.status(403).json({
          path: ['general'],
          message: 'wrong credentials, please try again',
        });
      } else if (err.code === 'auth/user-not-found') {
        return res.status(404).json({
          path: ['general'],
          message: 'account does not exist',
        });
      } else if (err.code === 'auth/too-many-requests') {
        return res.status(500).json({
          path: ['general'],
          message: 'too many requests, please try again later',
        });
      }
      return res.status(500).json({ error: err.code });
    });
};

export default {
  login,
};
