import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as matchController from '../controller/match.js';

const router = express.Router();

const validateSignup = [validate];

router.delete('/cancel/:matchid', matchController.cancel);

export default router;
