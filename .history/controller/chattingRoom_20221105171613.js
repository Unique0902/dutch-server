import {} from 'express-async-errors';
import * as chattingRoomRepository from '../data/chattingRoom.js';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';
import e from 'cors';

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

export async function getopponentuserdata(req, res) {
  const roomId = req.params.roomid;
  const userId = req.params.userid;
  const froom = await chattingRoomRepository.findById(roomId);
  if (!froom) {
    return res.status(401).json({ message: 'Invalid roomId' });
  }
  const room = froom.dataValues;
  if (room.user1Id == userId) {
    const fopponentUserData = await userRepository.findByUid(room.user2Id);
    if (!fopponentUser) {
      return res.status(401).json({ message: 'Invalid room user2Id' });
    }
    const opponentUserData = fopponentUserData.dataValues;
    return res.status(202).json({
      message: `opponentUserData`,
      opponentUserData: {
        uid: opponentUserData.uid,
        name: opponentUserData.name,
        sex: opponentUserData.sex,
      },
    });
  } else if (room.user2Id == userId) {
    const fopponentUserData = await userRepository.findByUid(room.user1Id);
    if (!fopponentUser) {
      return res.status(401).json({ message: 'Invalid room user1Id' });
    }
    const opponentUserData = fopponentUserData.dataValues;
    return res.status(202).json({
      message: `opponentUserData`,
      opponentUserData: {
        uid: opponentUserData.uid,
        name: opponentUserData.name,
        sex: opponentUserData.sex,
      },
    });
  } else {
    return res.status(401).json({ message: 'Invalid userId' });
  }
}
export async function cancel(req, res, next) {
  const roomId = req.params.roomid;
  const room = await chattingRoomRepository.removeById(roomId);
  if (!room) {
    return res.status(401).json({ message: 'Invalid roomId' });
  }
  res.status(200).json({ room });
}
export async function findByMatchId(req, res, next) {
  const matchId = req.params.matchid;
  const room = await chattingRoomRepository.findByMatchId(matchId);
  if (!room) {
    return res.status(401).json({ message: 'Invalid matchId' });
  }
  res.status(200).json({ room });
}
