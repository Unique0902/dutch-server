import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as chattingRoomController from '../controller/chattingRoom.js';

const router = express.Router();

router.post('/make', chattingRoomController.make);

router.get('/check/:id', chattingRoomController.check);

router.get('/cancel/:id', chattingRoomController.cancel);

export default router;
