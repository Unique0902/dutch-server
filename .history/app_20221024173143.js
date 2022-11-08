import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import authRouter from './router/auth.js';
import findMatchRouter from './router/findMatch.js';
import beforeMatchRouter from './router/beforeMatch.js';
import matchRouter from './router/match.js';
import chattingRoomRouter from './router/chattingRoom.js';
import chatRouter from './router/chat.js';
import { config } from './config.js';
import { sequelize } from './services/database.js';
import { Server } from 'socket.io';
import { initSocket } from './services/socket.js';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/auth', authRouter);
app.use('/findmatch', findMatchRouter);
app.use('/match', matchRouter);
app.use('/beforematch', beforeMatchRouter);
app.use('/chattingroom', chattingRoomRouter);
app.use('/chat', chatRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

sequelize.sync().then((client) => {
  console.log('hi');
});

const server = app.listen(8080);
initSocket(server);
