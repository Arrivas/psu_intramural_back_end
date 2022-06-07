import { Request, Response } from 'express';
import { db } from '../config/firebase';

const ref = db.collection('matches');

const createMatch = async (req: Request, res: Response) => {
  const newMatch = {
    teamOne: req.body.teamOne,
    teamTwo: req.body.teamTwo,
    matchDate: req.body.matchDate,
    field: req.body.field,
  };
  return await ref
    .add(newMatch)
    .then(() => res.status(200).json({ message: 'match created' }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

const getMatches = async (req: Request, res: Response) => {
  await ref
    .get()
    .then((data) => {
      const currentMatches: any = [];
      if (data.empty)
        return res.status(404).json({ message: 'cannot get matches' });
      data.forEach((doc) => currentMatches.push(doc.data()));
      return res.status(200).json(currentMatches);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

export default { createMatch, getMatches };
