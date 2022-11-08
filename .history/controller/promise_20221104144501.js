import {} from 'express-async-errors';
import * as promiseRepository from '../data/promise.js';
import * as matchRepository from '../data/match.js';
import * as findMatchRepository from '../data/findMatch.js';
import { config } from '../config.js';

export async function make(req, res) {
  const { loc, time, matchId, roomId } = req.body;
  const promiseData = await promiseRepository.create(
    {
      loc,
      time,
      matchId,
    },
    roomId
  );
  return res.status(202).json({ message: `promise making`, promiseData });
}

export async function update(req, res) {
  const { id, beforeMatchId } = req.body;
  await promiseRepository.updateChattingRoomById(id, beforeMatchId);
  return res.status(202).json({ message: `promise Updated` });
}

export async function end(req, res, next) {
  const promiseId = req.params.promiseid;
  const roomId = req.params.roomid;
  const fpromise = await promiseRepository.findById(promiseId);
  if (!fpromise) {
    return res.status(401).json({ message: 'Invalid promiseId' });
  }
  const promise = fpromise.dataValues;
  const fmatch = await matchRepository.findById(promise.matchId);
  if (!fmatch) {
    return res.status(401).json({ message: 'no findMatch1 in that promise' });
  }
  const match = fmatch.dataValues;
  const ffindMatch1 = await findMatchRepository.findById(match.matchData1Id);
  if (!ffindMatch1) {
    return res.status(401).json({ message: 'no match in that promise' });
  }
  const ffindMatch2 = await findMatchRepository.findById(match.matchData2Id);
  if (!ffindMatch2) {
    return res.status(401).json({ message: 'no findMatch2 in that promise' });
  }
  const findMatch1 = ffindMatch1.dataValues;
  const findMatch2 = ffindMatch2.dataValues;
  const { id, slat, slng, alat, alng, srad, arad, isMatching, uid } =
    findMatch1;
  matchData1Id = await beforeMatchDataRepository.create({
    slat,
    slng,
    alat,
    alng,
    srad,
    arad,
    uid,
  });
  res.status(200).json({ promise });
}

export async function cancel(req, res, next) {
  const promiseId = req.params.promiseid;
  const roomId = req.params.roomid;
  const promise = await promiseRepository.removeById(promiseId);
  if (!promise) {
    return res.status(401).json({ message: 'Invalid promiseId' });
  }
  res.status(200).json({ promise });
}

export async function remove(req, res, next) {
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
