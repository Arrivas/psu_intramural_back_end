import { Request, Response } from 'express';
import { db } from '../config/firebase';

const ref = db.collection('results');

const creaetReult = async (req: Request, res: Response) => {
  return ref
    .add(req.body.result)
    .then(() => res.status(200).json({ message: 'results added' }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

const getResult = async (_req: Request, res: Response) => {
  await ref.get().then((data) => {
    const currentVenues: any = [];
    if (data.empty)
      return res.status(404).json({ message: 'cannot get results' });
    data.forEach((doc) => currentVenues.push(doc.data()));
    return res.status(200).json(currentVenues);
  });
};

export default { creaetReult, getResult };
