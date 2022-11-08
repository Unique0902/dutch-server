import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';
import * as userDataRepository from '../data/userData.js';
import { config } from '../config.js';
import '../services/firebase.js';
import { getAuth } from 'firebase-admin/auth';

export async function signup(req, res) {
  const { uid, name, sex, age } = req.body;
  const found = await userRepository.findByName(name);
  if (found) {
    return res.status(409).json({ message: `${name} already exists` });
  }
  const userId = await userRepository.createUser({
    uid,
    name,
    sex,
    age,
  });
  const userDataId = await userRepository.createUser({ userId: uid });
  res.status(201).json({ name });
}

export async function check(req, res, next) {
  const uid = req.params.uid;
  const user = await userRepository.findByUid(uid);
  if (!user) {
    return res.status(401).json({ message: 'Invalid uid' });
  }
  res.status(200).json({ name: user.name });
}

export async function me(req, res, next) {
  const user = await userRepository.findByUid(req.uid);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ token: req.token, username: user.username });
}
