import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as promiseController from '../controller/promise.js';

const router = express.Router();

const validateSignup = [
  body('loc').notEmpty().withMessage('loc is missing'),
  body('time').notEmpty().withMessage('time is missing'),
  body('matchId').notEmpty().withMessage('matchId is missing'),
  validate,
];

router.get('/findbymatchid/:matchid', promiseController.findByMatchId);
router.post('/make', validateSignup, promiseController.make);
router.delete('/:promiseid', promiseController.remove);
router.delete('/complete/:promiseid/:roomid', promiseController.complete);
router.delete('/cancel/:promiseid/:roomid', promiseController.cancel);

export default router;
