import { Server } from 'socket.io';
import { config } from '../config.js';

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    this.io.on('connection', (socket) => {
      console.log('Socket client connected');
      let roomName = null;
      socket.on('join', (data) => {
        roomName = data;
        socket.join(data);
      });
    });
  }
}

let socket;

export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
}
export function getSocketIo() {
  if (!socket) {
    throw new Error('Please call init first');
  }
  return socket.io;
}
