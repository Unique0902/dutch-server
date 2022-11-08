import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as findMatchController from '../controller/findMatch.js';

const router = express.Router();

const validateSignup = [
  body('uid')
    .trim()
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage('uid should be at least 5 characters'),
  body('slat').notEmpty().withMessage('slat is missing'),
  body('slng').notEmpty().withMessage('slng is missing'),
  body('alat').notEmpty().withMessage('alat is missing'),
  body('alng').notEmpty().withMessage('alng is missing'),
  body('srad').notEmpty().withMessage('srad is missing'),
  body('arad').notEmpty().withMessage('arad is missing'),
  validate,
];

router.post('/make', validateSignup, findMatchController.make);

router.get('/check/:id', findMatchController.check);

router.get('/:id', findMatchController.take);

router.get('/checkmatching/uid', findMatchController.takeByUid);

router.get('/end/:uid', findMatchController.end);

router.delete('/cancel/:uid', findMatchController.cancel);

router.delete('/cancelbyid/:id', findMatchController.cancelById);

export default router;
