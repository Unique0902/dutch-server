import {} from 'express-async-errors';
import * as findMatchRepository from '../data/findMatch.js';
import * as beforeMatchDataRepository from '../data/beforeMatchData.js';
import * as chattingRoomRepository from '../data/chattingRoom.js';
import * as matchRepository from '../data/match.js';
import { config } from '../config.js';
import '../services/firebase.js';
import { meterMeasure } from '../math/distance.js';

export async function make(req, res) {
  const { uid, slat, slng, alat, alng, srad: nsrad, arad: narad } = req.body;
  let srad = parseInt(nsrad);
  let arad = parseInt(narad);
  const findMatchArr = await findMatchRepository.all();
  let isMatching = false;
  let matchingId;
  let otherUid;
  for (let i = 0; i < findMatchArr.length; i++) {
    const match = findMatchArr[i].dataValues;
    if (match.isMatching) {
      continue;
    }
    console.log(match);
    const {
      id: id2,
      uid: uid2,
      slat: slat2,
      slng: slng2,
      alat: alat2,
      alng: alng2,
      srad: nsrad2,
      arad: narad2,
    } = match;
    let srad2 = parseInt(nsrad2);
    let arad2 = parseInt(narad2);
    const meter1 = meterMeasure(slat, slng, slat2, slng2);
    if (meter1 <= srad && meter1 <= srad2) {
      const meter2 = meterMeasure(alat, alng, alat2, alng2);
      if (meter2 <= arad && meter2 <= arad2) {
        isMatching = true;
        matchingId = id2;
        otherUid = uid2;
        break;
      }
    }
  }
  const newFindMatchId = await findMatchRepository.create({
    uid,
    slat,
    slng,
    alat,
    alng,
    srad,
    arad,
  });
  if (isMatching) {
    const matchId = await matchRepository.create({
      matchData1Id: newFindMatchId,
      matchData2Id: matchingId,
    });
    const roomId = await chattingRoomRepository.create({
      matchId,
      user1Id: uid,
      user2Id: otherUid,
    });
    await findMatchRepository.updateMatchingById(newFindMatchId, matchId);
    await findMatchRepository.updateMatchingById(matchingId, matchId);
    return res.status(202).json({ message: `match making`, matchId, roomId });
  } else {
    res.status(201).json({ newFindMatchId });
  }
}

export async function check(req, res, next) {
  const findMatchId = req.params.id;
  const findMatch = await findMatchRepository.findById(findMatchId);
  if (!findMatch) {
    return res.status(401).json({ message: 'Invalid id' });
  }
  if (findMatch.dataValues.isMatching) {
    const matchId = findMatch.dataValues.matchId;
    const chattingRoom = await chattingRoomRepository.findByMatchId(matchId);
    if (chattingRoom) {
      const roomId = chattingRoom.dataValues.id;
      res.status(200).json({ matchId, roomId });
    } else {
      res.status(200).json({ message: 'no chattingRoom!' });
    }
  } else {
    res.status(200).json({ message: 'not matching' });
  }
}

export async function end(req, res, next) {
  const uid = req.params.uid;
  const findMatch = await findMatchRepository.findByUid(uid);
  if (findMatch) {
    const { id, slat, slng, alat, alng, srad, arad, isMatching } =
      findMatch.dataValues;
    const beforeMatchDataId = beforeMatchDataRepository.create({
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
  res.status(200).json({ beforeMatchDataId });
}

export async function cancel(req, res, next) {
  const uid = req.params.uid;
  const user = await findMatchRepository.removeByUid(uid);
  if (!user) {
    return res.status(401).json({ message: 'Invalid uid' });
  }
  res.status(200).json({ name: user.uid });
}
export async function cancelById(req, res, next) {
  const id = req.params.id;
  const user = await findMatchRepository.removeById(id);
  if (!user) {
    return res.status(401).json({ message: 'Invalid id' });
  }
  res.status(200).json({ message: 'cancel successfully' });
}
