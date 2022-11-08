import {} from 'express-async-errors';
import * as matchRepository from '../data/match.js';
import * as chattingRoomRepository from '../data/chattingRoom.js';
import { config } from '../config.js';
import '../services/firebase.js';
import { meterMeasure } from '../math/distance.js';

export async function cancel(req, res, next) {
  const matchId = req.params.matchid;
  const user = await matchRepository.removeByUid(uid);
  if (!user) {
    return res.status(401).json({ message: 'Invalid uid' });
  }
  res.status(200).json({ name: user.uid });
}
