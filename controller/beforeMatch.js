import {} from 'express-async-errors';
import * as beforeMatchRepository from '../data/beforeMatch.js';
import { config } from '../config.js';

export async function cancel(req, res, next) {
  const matchId = req.params.matchid;
  const match = await beforeMatchRepository.removeById(matchId);
  if (!match) {
    return res.status(401).json({ message: 'Invalid uid' });
  }
  res.status(200).json({ message: 'remove match successfully!' });
}
