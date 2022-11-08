import {} from 'express-async-errors';
import * as chatRepository from '../data/chat.js';
import { config } from '../config.js';

export async function make(req, res) {
  const { text, userId, roomId, date, time } = req.body;
  const newChatId = await chatRepository.create({
    text,
    userId,
    roomId,
    date,
    time,
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
export async function cancel(req, res, next) {
  const chatId = req.params.chatid;
  const chat = await chatRepository.removeById(chatId);
  if (!chat) {
    return res.status(401).json({ message: 'Invalid chatId' });
  }
  res.status(200).json({ chat });
}
