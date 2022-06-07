import { Request, Response } from 'express';
import { db } from '../config/firebase';

const ref = db.collection('teams');
const createTeams = async (req: Request, res: Response) => {
  const newTeam = {
    teamName: req.body.teamName,
    teamList: req.body.teamList,
    department: req.body.department,
  };
  await ref
    .where('teamName', '==', newTeam.teamName)
    .limit(1)
    .get()
    .then(async (data) => {
      if (!data.empty)
        return res.status(409).json({ message: 'team already exist' });
      return await ref.add(newTeam);
    })
    .then(() => res.status(201).json({ message: 'team created' }))
    .catch((err) => res.status(500).json({ message: err }));
};

const getTeams = async (_req: Request, res: Response) => {
  await ref
    .get()
    .then((data) => {
      const currentTeams: any = [];
      if (data.empty)
        return res.status(404).json({ message: 'cannot get teams' });
      data.forEach((doc) => {
        currentTeams.push(doc.data());
      });
      return res.status(200).json(currentTeams);
    })
    .catch((err) => res.status(500).json({ message: err }));
};

export default { createTeams, getTeams };
