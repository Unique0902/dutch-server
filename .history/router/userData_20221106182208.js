import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as userDataController from '../controller/userData.js';

const router = express.Router();

const validateSignup = [
  body('userId').notEmpty().withMessage('userId is missing'),
  body('isChecked1').notEmpty().withMessage('isChecked1 is missing'),
  body('isChecked2').notEmpty().withMessage('isChecked2 is missing'),
  body('isChecked3').notEmpty().withMessage('isChecked3 is missing'),
  validate,
];

router.get('/blamedata/:userid', userDataController.getBlameData);
router.get('/praisedata/:userid', userDataController.getPraiseData);
router.get('/blacklist/:userid', userDataController.getBlacklist);
router.post('/blamedata', validateSignup, promiseController.make);

export default router;
