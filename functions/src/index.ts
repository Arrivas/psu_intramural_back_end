import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

// controller
import auth from './auth/auth';
import user from './controller/user';
import teams from './controller/teams';
import lineup from './controller/lineup';
import matches from './controller/matches';
import venues from './controller/venues';
import gameresult from './controller/gameresult';
import rankings from './controller/rankings';

// middleware
import createUserMiddleware from './middleware/createUserMiddleware';
import authMiddleware from './middleware/authMiddleware';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) =>
  res.status(200).json({ message: 'hello from firebase /' })
);

// auth
app.post('/auth', authMiddleware.checkBody, auth.login);

// user
app.post('/user', createUserMiddleware.checkBody, user.createUser);
app.get('/user', user.getUser);
// teams
app.post('/teams', teams.createTeams);
app.get('/teams', teams.getTeams);
// matches
app.post('/matches', matches.createMatch);
app.get('/matches', matches.getMatches);
// venues
app.post('/venues', venues.createVenue);
app.get('/venues', venues.getVenue);
// results
app.post('/results', gameresult.creaetReult);
app.get('/results', gameresult.getResult);
// rankings
app.post('/rankings', rankings.createRankings);
app.get('/rankings', rankings.getRankings);
// lineup
app.post('/lineups', lineup.createLineUp);
app.get('/lineups', lineup.getlineUp);

exports.app = functions.region('asia-east2').https.onRequest(app);
