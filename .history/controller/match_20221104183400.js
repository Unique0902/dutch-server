import {} from 'express-async-errors';
import * as findMatchRepository from '../data/findMatch.js';
import * as matchRepository from '../data/match.js';
import * as beforeMatchRepository from '../data/beforeMatch.js';
import * as beforeMatchDataRepository from '../data/beforeMatchData.js';
import * as chattingRoomRepository from '../data/chattingRoom.js';
import * as promiseRepository from '../data/promise.js';
import { config } from '../config.js';

export async function cancel(req, res, next) {
  const matchId = req.params.matchid;
  const roomId = req.params.roomid;
  const match = await matchRepository.removeById(matchId, roomId);
  if (!match) {
    return res.status(401).json({ message: 'Invalid uid' });
  }
  res.status(200).json({ message: 'remove match successfully!' });
}

export async function end(req, res, next) {
  const { status, matchId, roomId } = req.body;
  const fmatch = await matchRepository.findById(matchId);
  if (!fmatch) {
    return res.status(401).json({ message: 'Invalid MatchId' });
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
    status,
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
  await fmatch.destroy();
  getSocketIo().in(roomId).emit('match-delete', beforePromiseId);
  await ffindMatch1.destroy();
  await ffindMatch2.destroy();
  res.status(200).json({ beforePromiseId });
}

export async function takeMatchingByUid(req, res, next) {
  const uid = req.params.uid;
  const findmatchData = await findMatchRepository.findByUid(uid);
  if (!findmatchData) {
    return res.status(200).json({ message: 'no matching data' });
  }
  const myMatchData = findmatchData.dataValues;
  if (!myMatchData.isMatching) {
    return res.status(200).json({ message: 'no matching' });
  }
  const fMatch = await matchRepository.findById(myMatchData.matchId);
  const match = fMatch.dataValues;
  const room = await chattingRoomRepository.findByMatchId(match.id);
  const roomId = room.dataValues.id;
  let fOpponentMatchData;
  if (match.matchData1Id != myMatchData.id) {
    fOpponentMatchData = await findMatchRepository.findById(match.matchData1Id);
  } else {
    fOpponentMatchData = await findMatchRepository.findById(match.matchData2Id);
  }
  const opponentMatchData = fOpponentMatchData.dataValues;
  const fpromise = await promiseRepository.findByMatchId(match.id);
  if (fpromise) {
    const promiseData = fpromise.dataValues;
    res
      .status(200)
      .json({ promiseData, myMatchData, opponentMatchData, roomId });
  } else {
    res.status(200).json({ myMatchData, opponentMatchData, roomId });
  }
}

export async function take(req, res, next) {
  const id = req.params.matchid;
  const matchData = await matchRepository.findById(id);
  if (!matchData) {
    return res.status(401).json({ message: 'Invalid uid' });
  }
  res.status(200).json({ data: matchData.dataValues });
}
