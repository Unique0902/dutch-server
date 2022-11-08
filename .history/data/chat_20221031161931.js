import { sequelize } from '../services/database.js';
import { User } from './auth.js';
import SQ from 'sequelize';
import { getSocketIo } from '../services/socket.js';
import { ChattingRoom } from './chattingRoom.js';
const DataTypes = SQ.DataTypes;

export const Chat = sequelize.define('chat', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

Chat.belongsTo(User, { foreignKey: 'userId' });
Chat.belongsTo(ChattingRoom, { foreignKey: 'roomId' });

export async function all() {
  return Chat.findAll();
}

export async function findByRoomId(roomId) {
  return Chat.findAll({ where: { roomId } });
}

export async function findById(id) {
  return Chat.findOne({ where: { id } });
}

export async function removeById(id) {
  const chat = await Chat.findOne({ where: { id } });
  await chat.destroy();
  return true;
}

export async function create(chat) {
  getSocketIo().emit(`chat/${chat.roomId}`, chat);
  console.log(chat.roomId);
  return Chat.create(chat).then((data) => data.dataValues.id);
}
