import {} from 'express-async-errors';
import * as findMatchRepository from '../data/findMatch.js';
import * as matchRepository from '../data/match.js';
import * as beforeMatchRepository from '../data/beforeMatch.js';
import * as beforeMatchDataRepository from '../data/beforeMatchData.js';
import { config } from '../config.js';

export async function cancel(req, res, next) {
  const matchId = req.params.matchid;
  const match = await matchRepository.removeById(matchId);
  if (!match) {
    return res.status(401).json({ message: 'Invalid uid' });
  }
  res.status(200).json({ message: 'remove match successfully!' });
}

export async function end(req, res, next) {
  const { status, matchId } = req.body;
  const match = await matchRepository.findById(matchId);
  let matchData1Id;
  let matchData2Id;
  let beforeMatchId;
  if (match) {
    const matchData = match.dataValues;
    const findMatch1 = await findMatchRepository.findById(
      matchData.matchData1Id
    );
    if (findMatch1) {
      const { id, slat, slng, alat, alng, srad, arad, isMatching, uid } =
        findMatch1.dataValues;
      matchData1Id = await beforeMatchDataRepository.create({
        slat,
        slng,
        alat,
        alng,
        srad,
        arad,
        uid,
      });
    } else {
      return res.status(401).json({ message: 'Invalid uid' });
    }
    const findMatch2 = await findMatchRepository.findById(
      matchData.matchData2Id
    );
    if (findMatch2) {
      const { id, slat, slng, alat, alng, srad, arad, isMatching, uid } =
        findMatch2.dataValues;
      matchData2Id = await beforeMatchDataRepository.create({
        slat,
        slng,
        alat,
        alng,
        srad,
        arad,
        uid,
      });
    } else {
      return res.status(401).json({ message: 'Invalid uid' });
    }
    console.log(matchData1Id, matchData2Id);
    beforeMatchId = await beforeMatchRepository.create({
      status,
      matchData1Id,
      matchData2Id,
    });
  }

  res.status(200).json({
    beforeMatchId,
    findMatchData1Id: match.dataValues.matchData1Id,
    findMatchData2Id: match.dataValues.matchData2Id,
    matchData1Id,
    matchData2Id,
  });
}

export async function take(req, res, next) {
  const id = req.params.matchid;
  const matchData = await matchRepository.findById(id);
  if (!matchData) {
    return res.status(401).json({ message: 'Invalid uid' });
  }
  res.status(200).json({ data: matchData.dataValues });
}
