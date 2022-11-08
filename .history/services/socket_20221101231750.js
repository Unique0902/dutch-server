import { Server } from 'socket.io';
import { config } from '../config.js';
import * as findMatchRepository from '../data/findMatch.js';

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
      socket.on('join', (uid) => {
        console.log('소켓 입장', uid);
        socket.join(uid);
        socket.on('disconnect', (reason) => {
          console.log('꺼짐', reason);
          findMatchRepository.removeNotMatchingByUid(uid);
        });
      });
      socket.on('leave', (data) => {
        console.log('소켓 퇴장', data);
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
