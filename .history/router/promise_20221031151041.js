import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as promiseController from '../controller/promise.js';

const router = express.Router();

const validateSignup = [
  body('time').notEmpty().withMessage('time is missing'),
  body('matchId').notEmpty().withMessage('matchId is missing'),
  validate,
];

router.get('/findbymatchid/:matchid', promiseController.findByMatchId);
router.post('/make', validateSignup, promiseController.make);
router.post('/update', promiseController.update);
router.delete('/:promiseid', promiseController.cancel);

export default router;
