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
