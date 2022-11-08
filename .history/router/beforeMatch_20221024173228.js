import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as beforeMatchController from '../controller/beforeMatch.js';

const router = express.Router();

const validateSignup = [validate];

router.delete('/:matchid', beforeMatchController.cancel);

export default router;
