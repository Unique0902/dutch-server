import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as chat from '../controller/chat.js';

const router = express.Router();

router.post('/make', chatController.make);

export default router;
