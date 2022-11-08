import {} from 'express-async-errors';
import * as promiseRepository from '../data/promise.js';
import * as matchRepository from '../data/match.js';
import * as findMatchRepository from '../data/findMatch.js';
import * as beforeMatchRepository from '../data/beforeMatch.js';
import * as beforeMatchDataRepository from '../data/beforeMatchData.js';
import * as beforePromiseRepository from '../data/beforePromise.js';
import { getSocketIo } from '../services/socket.js';
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

export async function amend(req, res) {
  const { loc, time, id } = req.body;
  promiseRepository.amend(loc, time, id);
  return res.status(202).json({ message: `promise making`, promiseData });
}

export async function complete(req, res, next) {
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
  const matchData1Id = await beforeMatchDataRepository.create({
    slat: findMatch1.slat,
    slng: findMatch1.slng,
    alat: findMatch1.alat,
    alng: findMatch1.alng,
    srad: findMatch1.srad,
    arad: findMatch1.arad,
    uid: findMatch1.uid,
  });
  const matchData2Id = await beforeMatchDataRepository.create({
    slat: findMatch2.slat,
    slng: findMatch2.slng,
    alat: findMatch2.alat,
    alng: findMatch2.alng,
    srad: findMatch2.srad,
    arad: findMatch2.arad,
    uid: findMatch2.uid,
  });
  const beforeMatchId = await beforeMatchRepository.create({
    status: 'complete',
    matchData1Id,
    matchData2Id,
  });
  await beforeMatchDataRepository.updateMatchingById(
    matchData1Id,
    beforeMatchId
  );
  await beforeMatchDataRepository.updateMatchingById(
    matchData2Id,
    beforeMatchId
  );
  const beforePromiseId = await beforePromiseRepository.create({
    status: 'complete',
    loc: promise.loc,
    time: promise.time,
    beforeMatchId,
  });
  await beforeMatchRepository.updatePromiseId(beforeMatchId, beforePromiseId);
  await fpromise.destroy();
  getSocketIo().in(roomId).emit('promise-delete', 'complete');
  await fmatch.destroy();
  await ffindMatch1.destroy();
  await ffindMatch2.destroy();
  res.status(200).json({ beforePromiseId });
}

export async function cancel(req, res, next) {
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
  const matchData1Id = await beforeMatchDataRepository.create({
    slat: findMatch1.slat,
    slng: findMatch1.slng,
    alat: findMatch1.alat,
    alng: findMatch1.alng,
    srad: findMatch1.srad,
    arad: findMatch1.arad,
    uid: findMatch1.uid,
  });
  const matchData2Id = await beforeMatchDataRepository.create({
    slat: findMatch2.slat,
    slng: findMatch2.slng,
    alat: findMatch2.alat,
    alng: findMatch2.alng,
    srad: findMatch2.srad,
    arad: findMatch2.arad,
    uid: findMatch2.uid,
  });
  const beforeMatchId = await beforeMatchRepository.create({
    status: 'promiseCancel',
    matchData1Id,
    matchData2Id,
  });
  await beforeMatchDataRepository.updateMatchingById(
    matchData1Id,
    beforeMatchId
  );
  await beforeMatchDataRepository.updateMatchingById(
    matchData2Id,
    beforeMatchId
  );
  const beforePromiseId = await beforePromiseRepository.create({
    status: 'cancel',
    loc: promise.loc,
    time: promise.time,
    beforeMatchId,
  });
  await beforeMatchRepository.updatePromiseId(beforeMatchId, beforePromiseId);
  await fpromise.destroy();
  getSocketIo().in(roomId).emit('promise-delete', 'cancel');
  await fmatch.destroy();
  await ffindMatch1.destroy();
  await ffindMatch2.destroy();
  res.status(200).json({ beforePromiseId });
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
