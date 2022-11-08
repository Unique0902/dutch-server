import {} from 'express-async-errors';
import * as promiseRepository from '../data/promise.js';
import { config } from '../config.js';

export async function make(req, res) {
  const { loc, time, matchId } = req.body;
  const newPromiseId = await promiseRepository.create({
    loc,
    time,
    matchId,
  });
  return res.status(202).json({ message: `promise making`, newPromiseId });
}
export async function update(req, res) {
  const { id, beforeMatchId } = req.body;
  await promiseRepository.updateChattingRoomById(id, beforeMatchId);
  return res.status(202).json({ message: `promise Updated` });
}
export async function cancel(req, res, next) {
  const promiseId = req.params.promiseid;
  const promise = await promiseRepository.removeById(promiseId);
  if (!promise) {
    return res.status(401).json({ message: 'Invalid promiseId' });
  }
  res.status(200).json({ promise });
}
export async function findByMatchId(req, res, next) {
  const matchId = req.params.matchid;
  const room = await chattingRoomRepository.findByMatchId(matchId);
  if (!room) {
    return res.status(401).json({ message: 'Invalid matchId' });
  }
  res.status(200).json({ room });
}
