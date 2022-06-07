import { Request, Response } from 'express';
import { db } from '../config/firebase';

const ref = db.collection('lineups');

const createLineUp = async (req: Request, res: Response) => {
  const lineup = {
    teamName: req.body.teamName,
    lineups: req.body.lineups,
  };
  await ref
    .add(lineup)
    .then(() => res.status(200).json({ message: 'line-up created' }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

const getlineUp = async (_req: Request, res: Response) => {
  await ref
    .get()
    .then((data) => {
      const currentLineUps: any = [];
      if (data.empty)
        return res.status(404).json({ message: 'cannot get lineup' });
      data.forEach((doc) => currentLineUps.push(doc.data()));
      return res.status(200).json(currentLineUps);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

export default { createLineUp, getlineUp };
