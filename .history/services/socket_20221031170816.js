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
      socket.on('message', (data) => {
        io.sockets.in(roomName).emit('message', data);
        console.log(data);
      });
      socket.on('image', (data) => {
        io.sockets.in(roomName).emit('image', data);
        console.log(data);
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
