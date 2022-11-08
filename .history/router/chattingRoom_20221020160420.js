import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as chattingRoomController from '../controller/chattingRoom.js';

const router = express.Router();

const validateSignup = [
  body('uid')
    .trim()
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage('uid should be at least 5 characters'),
  body('slat').notEmpty().withMessage('slat is missing'),
  body('slng').notEmpty().withMessage('slng is missing'),
  validate,
];

router.post('/make', validateSignup, chattingRoomController.make);

export default router;
