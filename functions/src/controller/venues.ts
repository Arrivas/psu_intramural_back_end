import { Request, Response } from 'express';
import { db } from '../config/firebase';

const ref = db.collection('venues');

const createVenue = async (req: Request, res: Response) => {
  const newVenue = {
    event: req.body.event,
    venue: req.body.venue,
    date: req.body.date,
    singleTime: req.body.singleTime,
    girlsTime: req.body.girlsTime,
    boysTime: req.body.boysTime,
  };
  await ref
    .where('event', '==', newVenue.venue)
    .limit(1)
    .get()
    .then(async (doc) => {
      if (!doc.empty)
        return res.status(409).json({ message: 'event already exist' });
      return ref
        .add(newVenue)
        .then(() => res.status(200).json({ message: 'venue added' }));
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

const getVenue = async (req: Request, res: Response) => {
  await ref.get().then((data) => {
    const currentVenues: any = [];
    if (data.empty)
      return res.status(404).json({ message: 'cannot get venues' });
    data.forEach((doc) => currentVenues.push(doc.data()));
    return res.status(200).json(currentVenues);
  });
};

export default { createVenue, getVenue };
