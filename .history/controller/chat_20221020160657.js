import {} from 'express-async-errors';
import * as chattingRoomRepository from '../data/chattingRoom.js';
import { config } from '../config.js';

export async function make(req, res) {
  const { matchId, user1Id, user2Id } = req.body;
  const newChattingRoomId = await chattingRoomRepository.create({
    matchId,
    user1Id,
    user2Id,
  });
  return res
    .status(202)
    .json({ message: `chattingRoom making`, newChattingRoomId });
}
