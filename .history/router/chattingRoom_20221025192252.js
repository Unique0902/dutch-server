import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as chattingRoomController from '../controller/chattingRoom.js';

const router = express.Router();

const validateSignup = [
  body('matchId').notEmpty().withMessage('slat is missing'),
  body('user1Id').notEmpty().withMessage('slng is missing'),
  body('user2Id').notEmpty().withMessage('slng is missing'),
  validate,
];

router.get('/findbymatchid/:matchid', chattingRoomController.findByMatchId);
router.post('/make', validateSignup, chattingRoomController.make);
router.post('/update', chattingRoomController.update);
router.delete('/:roomid', chattingRoomController.cancel);

export default router;
