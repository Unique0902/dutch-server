import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as chattingRoomController from '../controller/chattingRoom.js';

const router = express.Router();

router.post('/make', chattingRoomController.make);

export default router;
