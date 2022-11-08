import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import authRouter from './router/auth.js';
import findMatchRouter from './router/findMatch.js';
import { config } from './config.js';
import { sequelize } from './services/database.js';
import { Server } from 'socket.io';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/auth', authRouter);
app.use('/findmatch', findMatchRouter);

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
const socket = new Server(server, {
  cors: {
    origin: '*',
  },
});
