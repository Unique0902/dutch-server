import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateSignup = [
  body('name')
    .trim()
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('name should be at least 2 characters'),
  body('uid')
    .trim()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage('uid should be at least 5 characters'),
  body('sex').notEmpty().withMessage('sex is missing'),
  body('age').notEmpty().withMessage('age is missing'),
  body('date').isDate().withMessage('invalid Date'),
  validate,
];

router.post('/signup', validateSignup, authController.signup);

router.post('/check', authController.check);

router.get('/me', isAuth, authController.me);

export default router;
