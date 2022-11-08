import {} from 'express-async-errors';
import * as findMatchRepository from '../data/findMatch.js';
import * as matchRepository from '../data/match.js';
import { config } from '../config.js';
import '../services/firebase.js';
import { meterMeasure } from '../math/distance.js';

export async function make(req, res) {
  const { uid, slat, slng, alat, alng, srad: nsrad, arad: narad } = req.body;
  let srad = parseInt(nsrad);
  let arad = parseInt(narad);
  const findMatchArr = await findMatchRepository.all();
  let isMatching = false;
  let matchingUid;
  for (let i = 0; i < findMatchArr.length; i++) {
    const match = findMatchArr[i].dataValues;
    console.log(match);
    const {
      uid: uid2,
      slat: slat2,
      slng: slng2,
      alat: alat2,
      alng: alng2,
      srad: nsrad2,
      arad: narad2,
    } = match;
    let srad2 = parseInt(nsrad2);
    let arad2 = parseInt(narad2);
    const meter1 = meterMeasure(slat, slng, slat2, slng2);
    console.log(meter1);
    if (meter1 <= srad && meter1 <= srad2) {
      const meter2 = meterMeasure(alat, alng, alat2, alng2);
      if (meter2 <= arad && meter2 <= arad2) {
        isMatching = true;
        matchingUid = uid2;
        break;
      }
    }
  }
  const newFindMatchId = await findMatchRepository.create({
    uid,
    slat,
    slng,
    alat,
    alng,
    srad,
    arad,
  });
  if (isMatching) {
    // matchRepository.create({})
    return res.status(409).json({ message: `match making` });
  } else {
    res.status(201).json({ uid });
  }
}

export async function cancel(req, res, next) {
  const uid = req.params.uid;
  const user = await findMatchRepository.removeByUid(uid);
  if (!user) {
    return res.status(401).json({ message: 'Invalid uid' });
  }
  res.status(200).json({ name: user.uid });
}
