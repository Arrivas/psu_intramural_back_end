import { db, firebase } from '../config/firebase';
import { config } from '../config/config';
import { Request, Response } from 'express';

const createUser = async (req: Request, res: Response) => {
  const ref = db.collection('users');
  const noImg = 'noImage.png';
  let newUser: any = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };
  await ref
    .where('name', '==', newUser.name)
    .limit(1)
    .get()
    .then(async (data) => {
      if (!data.empty)
        return res.status(409).json({ message: 'name is already in use.' });
      return await firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);
    })
    .then((data: any) => {
      newUser.userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((token) => {
      newUser.createdAt = new Date().toISOString();
      newUser.imgUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`;
      db.collection('users')
        .add(newUser)
        .then(async (doc) => (newUser.docId = doc.id))
        .then(async () => {
          return await ref
            .doc(newUser.docId)
            .update(newUser)
            .catch((err) =>
              res.status(500).json({
                error: err,
              })
            );
        })
        .catch((err) =>
          res.status(500).json({
            error: err,
          })
        );
      return res.status(201).json({ token });
    })
    .catch((err) => {
      if (err.code === 'auth/email-already-in-use') {
        return res.status(409).json({ message: 'email already in use' });
      }
      return res.status(500).json({
        error: err.message,
      });
    });
};

const getUser = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const ref = db.collection('users');
  await ref
    .where('userId', '==', uid)
    .limit(1)
    .get()
    .then((data) => {
      const currentUser: any = [];
      if (data.empty)
        return res.status(404).json({ message: 'user does not exist' });
      data.forEach((d) => currentUser.push(d.data()));
      return res.status(200).send(currentUser[0]);
    })
    .catch((err) => res.status(500).json(err));
};

export default { createUser, getUser };
