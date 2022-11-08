import {} from 'express-async-errors';
import * as chattingRoomRepository from '../data/chattingRoom.js';
import { config } from '../config.js';

export async function make(req, res) {
  const { matchId, user1Id, user2Id } = req.body;
  const newChattingRoomId = await chattingRoomRepository.create({
    matchId,
    user1Id,
    user2Id,
    isNow: true,
  });
  return res
    .status(202)
    .json({ message: `chattingRoom making`, newChattingRoomId });
}
export async function update(req, res) {
  const { id, beforeMatchId } = req.body;
  await chattingRoomRepository.updateChattingRoomById(id, beforeMatchId);
  return res.status(202).json({ message: `chattingRoom Updated` });
}
export async function cancel(req, res, next) {
  const roomId = req.params.roomid;
  const room = await chattingRoomRepository.removeById(roomId);
  if (!room) {
    return res.status(401).json({ message: 'Invalid roomId' });
  }
  res.status(200).json({ room });
}
