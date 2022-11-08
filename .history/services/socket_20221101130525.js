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
      let roomId = null;
      socket.on('join', (data) => {
        socket.join(data);
      });
      socket.on('leave', (data) => {
        console.log('채팅방 입장 data');
        socket.leave(data);
      });
      socket.on('message', (data) => {
        io.sockets.in(roomId).emit('message', data);
        console.log(data);
      });
      socket.on('image', (data) => {
        io.sockets.in(roomId).emit('image', data);
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
