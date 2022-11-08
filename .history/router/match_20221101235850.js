import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as matchController from '../controller/match.js';

const router = express.Router();

const validateSignup = [validate];

router.post('/end', matchController.end);

router.delete('/:matchid/:roomid', matchController.cancel);

router.get('/:matchid', matchController.take);

router.get('/take/:uid', matchController.takeMatchingByUid);

export default router;
