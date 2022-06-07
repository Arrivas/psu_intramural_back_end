import { Request, Response } from 'express';
import { db } from '../config/firebase';

const ref = db.collection('rankings');

const createRankings = async (req: Request, res: Response) => {
  const { result } = req.body;
  await ref;

  return ref
    .add(result)
    .then(() => res.status(200).json({ message: 'rankings added' }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

const getRankings = async (_req: Request, res: Response) => {
  await ref.get().then((data) => {
    const currentVenues: any = [];
    if (data.empty)
      return res.status(404).json({ message: 'cannot get rankings' });
    data.forEach((doc) => currentVenues.push(doc.data()));
    return res.status(200).json(currentVenues);
  });
};

export default { createRankings, getRankings };
