import {} from 'express-async-errors';
import * as chatRepository from '../data/chat.js';
import { config } from '../config.js';

export async function make(req, res) {
  const { text, userId, roomId } = req.body;
  const newChatId = await chatRepository.create({
    text,
    userId,
    roomId,
  });
  return res.status(202).json({ message: `chat making`, newChatId });
}

export async function get(req, res) {
  const roomId = req.params.roomid;
  const chats = await chatRepository.findByRoomId(roomId);
  if (!chats) {
    return res.status(401).json({ message: 'Invalid roomId' });
  }
  res.status(200).json({ chats });
}
