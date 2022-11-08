import {} from 'express-async-errors';
import * as userDataRepository from '../data/userData.js';
import * as userRepository from '../data/auth.js';
import { getSocketIo } from '../services/socket.js';
import { config } from '../config.js';

export async function create(req, res) {
  const { userId } = req.body;
  const user = userRepository.findByUid(userId);
  if (!user) {
    return res.status(404).json({ message: `uid not exists` });
  }
  const userDataId = await userDataRepository.create({ userId });
  res.status(201).json({ userDataId });
}
