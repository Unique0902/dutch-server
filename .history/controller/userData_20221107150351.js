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
  const { userId, isChecked1, isChecked2, isChecked3, roomId } = req.body;
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
    const praiseData = JSON.stringify({
      praise1,
      praise2,
      praise3,
      matchData: { roomId: { roomId, isChecked1, isChecked2, isChecked3 } },
    });
    await userDataRepository.updatePraiseData(userId, praiseData);
  } else {
    const fpraiseData = JSON.parse(userData.praiseData);
    const praise1 = isChecked1 ? fpraiseData.praise1 + 1 : fpraiseData.praise1;
    const praise2 = isChecked2 ? fpraiseData.praise2 + 1 : fpraiseData.praise2;
    const praise3 = isChecked3 ? fpraiseData.praise3 + 1 : fpraiseData.praise3;
    const praiseData = JSON.stringify({
      praise1,
      praise2,
      praise3,
      matchData: {
        ...fpraiseData.matchData,
        roomId: { roomId, isChecked1, isChecked2, isChecked3 },
      },
    });
    await userDataRepository.updatePraiseData(userId, praiseData);
  }
  res.status(201).json({ message: 'update praiseData successfully' });
}

export async function getPraiseData(req, res, next) {
  const userId = req.params.userid;
  const user = await userRepository.findByUid(userId);
  if (!user) {
    return res.status(404).json({ message: `user not exists` });
  }
  const fuserData = await userDataRepository.findByUserId(userId);
  if (!fuserData) {
    return res.status(404).json({ message: `userData not exists` });
  }
  const userData = fuserData.dataValues;
  const praiseData = JSON.parse(userData.praiseData);
  return res.status(200).json({ praiseData });
}

export async function updateBlameData(req, res) {
  const { userId, isChecked1, isChecked2, isChecked3, roomId } = req.body;
  const fuser = await userRepository.findByUid(userId);
  if (!fuser) {
    return res.status(404).json({ message: `user not exists` });
  }
  const fuserData = await userDataRepository.findByUserId(userId);
  if (!fuserData) {
    return res.status(404).json({ message: `userData not exists` });
  }
  const userData = fuserData.dataValues;
  if (!userData.blameData) {
    const blame1 = isChecked1 ? 1 : 0;
    const blame2 = isChecked2 ? 1 : 0;
    const blame3 = isChecked3 ? 1 : 0;
    const blameData = JSON.stringify({
      blame1,
      blame2,
      blame3,
      matchData: { roomId: { roomId, isChecked1, isChecked2, isChecked3 } },
    });
    await userDataRepository.updateBlameData(userId, blameData);
  } else {
    const fblameData = JSON.parse(userData.blameData);
    const blame1 = isChecked1 ? fblameData.blame1 + 1 : fblameData.blame1;
    const blame2 = isChecked2 ? fblameData.blame2 + 1 : fblameData.blame2;
    const blame3 = isChecked3 ? fblameData.blame3 + 1 : fblameData.blame3;
    const blameData = JSON.stringify({ blame1, blame2, blame3 });
    await userDataRepository.updateBlameData(userId, blameData);
  }
  res.status(201).json({ message: 'update blameData successfully' });
}

export async function getBlameData(req, res, next) {
  const userId = req.params.userid;
  const user = await userRepository.findByUid(userId);
  if (!user) {
    return res.status(404).json({ message: `user not exists` });
  }
  const fuserData = await userDataRepository.findByUserId(userId);
  if (!fuserData) {
    return res.status(404).json({ message: `userData not exists` });
  }
  const userData = fuserData.dataValues;
  const blameData = JSON.parse(userData.blameData);
  return res.status(200).json({ blameData });
}

export async function updateBlacklist(req, res) {
  const { userId, opponentUserId } = req.body;
  const fuser = await userRepository.findByUid(userId);
  if (!fuser) {
    return res.status(404).json({ message: `user not exists` });
  }
  const fopponentUser = await userRepository.findByUid(opponentUserId);
  if (!fopponentUser) {
    return res.status(404).json({ message: `opponentUser not exists` });
  }
  const fuserData = await userDataRepository.findByUserId(userId);
  if (!fuserData) {
    return res.status(404).json({ message: `userData not exists` });
  }
  const userData = fuserData.dataValues;
  if (!userData.blacklist) {
    const blacklistArr = [opponentUserId];
    const blacklist = JSON.stringify({ ...blacklistArr });
    await userDataRepository.updateBlacklist(userId, blacklist);
  } else {
    const ffblacklist = JSON.parse(userData.blacklist);
    const fblacklist = Object.values(ffblacklist);
    const isExistedUserId = fblacklist.find(
      (uidInArr) => uidInArr == opponentUserId
    );
    if (isExistedUserId) {
      return res.status(403).json({ message: `userid exist in blacklist` });
    }
    const blacklistArr = [...fblacklist, opponentUserId];
    const blacklist = JSON.stringify({ ...blacklistArr });
    await userDataRepository.updateBlacklist(userId, blacklist);
  }
  res.status(201).json({ message: 'update blacklist successfully' });
}

export async function getBlacklist(req, res, next) {
  const userId = req.params.userid;
  const user = await userRepository.findByUid(userId);
  if (!user) {
    return res.status(404).json({ message: `user not exists` });
  }
  const fuserData = await userDataRepository.findByUserId(userId);
  if (!fuserData) {
    return res.status(404).json({ message: `userData not exists` });
  }
  const userData = fuserData.dataValues;
  const fblacklist = JSON.parse(userData.blacklist);
  const blacklist = Object.values(fblacklist);
  return res.status(200).json({ blacklist });
}
