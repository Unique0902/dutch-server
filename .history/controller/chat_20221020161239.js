import {} from 'express-async-errors';
import * as chatRepository from '../data/chat.js';
import { config } from '../config.js';

export async function make(req, res) {
  const { text, userId, roomId } = req.body;
  const newChattingRoomId = await chatRepository.create({
    matchId,
    user1Id,
    user2Id,
  });
  return res
    .status(202)
    .json({ message: `chattingRoom making`, newChattingRoomId });
}
