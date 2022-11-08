import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as chatController from '../controller/chat.js';

const router = express.Router();

const validateSignup = [
  body('uid')
    .trim()
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage('uid should be at least 5 characters'),
  validate,
];

router.post('/make', validateSignup, chatController.make);

router.get('/get/:matchId', chatController.get);

export default router;
