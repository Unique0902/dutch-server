import { sequelize } from '../services/database.js';
import { Match } from './match.js';
import { User } from './auth.js';
import SQ from 'sequelize';
import { getSocketIo } from '../services/socket.js';
const DataTypes = SQ.DataTypes;

export const ChattingRoom = sequelize.define('chattingroom', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});
ChattingRoom.belongsTo(Match, { foreignKey: 'matchId' });
ChattingRoom.belongsTo(User, { foreignKey: 'user1Id' });
ChattingRoom.belongsTo(User, { foreignKey: 'user2Id' });

export async function all() {
  return Chat.findAll();
}

export async function findByMatchId(matchId) {
  return Chat.findAll({ where: { matchId } });
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
  getSocketIo().emit('chat', chat);
  return Chat.create(chat).then((data) => data.dataValues.id);
}
