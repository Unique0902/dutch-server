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

const validateSignup2 = [
  body('userId').notEmpty().withMessage('userId is missing'),
  body('isChecked1').notEmpty().withMessage('isChecked1 is missing'),
  body('isChecked2').notEmpty().withMessage('isChecked2 is missing'),
  body('isChecked3').notEmpty().withMessage('isChecked3 is missing'),
  validate,
];

const validateSignup3 = [
  body('userId').notEmpty().withMessage('userId is missing'),
  body('opponentUserId').notEmpty().withMessage('opponentUserId is missing'),
  validate,
];

const validateSignup4 = [
  body('userId').notEmpty().withMessage('userId is missing'),
  validate,
];
router.get('/blamedata/:userid', userDataController.getBlameData);
router.get('/praisedata/:userid', userDataController.getPraiseData);
router.get('/blacklist/:userid', userDataController.getBlacklist);
router.post('/blamedata', validateSignup, userDataController.updateBlameData);
router.post('/create', validateSignup4, userDataController.create);
router.post(
  '/praisedata',
  validateSignup2,
  userDataController.updatePraiseData
);
router.post('/blacklist', validateSignup3, userDataController.updateBlacklist);

export default router;
