import {} from 'express-async-errors';
import * as userDataRepository from '../data/userData.js';
import * as userRepository from '../data/auth.js';
import { getSocketIo } from '../services/socket.js';
import { config } from '../config.js';

export async function create(req, res) {
  const { userId } = req.body;
  const fuser = await userRepository.findByUid(userId);
  if (!fuser) {
    return res.status(404).json({ message: `uid not exists` });
  }
  const userDataId = await userDataRepository.create({ userId });
  res.status(201).json({ userDataId });
}
export async function updatePraiseData(req, res) {
  const { userId, isChecked1, isChecked2, isChecked3 } = req.body;
  const fuser = await userRepository.findByUid(userId);
  if (!fuser) {
    return res.status(404).json({ message: `user not exists` });
  }
  const fuserData = await userDataRepository.findByUserId(userId);
  if (!fuserData) {
    return res.status(404).json({ message: `userData not exists` });
  }
  const userData = fuserData.dataValues;
  if (!userData.praiseData) {
    const praise1 = isChecked1 ? 1 : 0;
    const praise2 = isChecked2 ? 1 : 0;
    const praise3 = isChecked3 ? 1 : 0;
    const praiseData = JSON.stringify({ praise1, praise2, praise3 });
    await userDataRepository.updatePraiseData(userId, praiseData);
  } else {
    const fpraiseData = userData.praiseData;
    const praise1 = isChecked1 ? fpraiseData.praise1 + 1 : fpraiseData.praise1;
    const praise2 = isChecked2 ? fpraiseData.praise2 + 1 : fpraiseData.praise2;
    const praise3 = isChecked3 ? fpraiseData.praise3 + 1 : fpraiseData.praise3;
    const praiseData = JSON.stringify({ praise1, praise2, praise3 });
    await userDataRepository.updatePraiseData(userId, praiseData);
  }
  res.status(201).json({ message: 'update praiseData successfully' });
}

export async function getPraiseData(req, res, next) {
  const userId = req.params.userId;
  const user = await userRepository.findByUid(userId);
  if (!user) {
    return res.status(404).json({ message: `user not exists` });
  }
  const fuserData = await userDataRepository.findByUserId(userId);
  if (!fuserData) {
    return res.status(404).json({ message: `userData not exists` });
  }
  const userData = fuserData.dataValues;
  return res.status(200).json({ praiseData: userData.praiseData });
}
