import {} from 'express-async-errors';
import * as chattingRoomRepository from '../data/chattingRoom.js';
import { config } from '../config.js';
import '../services/firebase.js';
import { meterMeasure } from '../math/distance.js';

export async function make(req, res) {
  const { matchId, user1Id, user2Id } = req.body;
  const newChattingRoomId = await chattingRoomRepository.create({
    matchId,
    user1Id,
    user2Id,
  });
  if (isMatching) {
    const matchId = await matchRepository.create({
      matchData1: newFindMatchId,
      matchData2: matchingId,
    });
    await findMatchRepository.updateMatchingById(newFindMatchId, matchId);
    await findMatchRepository.updateMatchingById(matchingId, matchId);
    return res.status(202).json({ message: `match making`, matchId });
  } else {
    res.status(201).json({ newFindMatchId });
  }
}
