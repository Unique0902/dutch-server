import { sequelize } from '../services/database.js';
import { Match } from './match.js';
import { User } from './auth.js';
import SQ from 'sequelize';
const DataTypes = SQ.DataTypes;

export const Chat = sequelize.define('chat', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});
Chat.belongsTo(Match, { foreignKey: 'matchId' });
Chat.belongsTo(User, { foreignKey: 'user1Id' });
Chat.belongsTo(User, { foreignKey: 'user2Id' });

export async function all() {
  return Chat.findAll();
}

export async function findByMatchId(matchId) {
  return Chat.findOne({ where: { matchId } });
}

export async function findById(id) {
  return Chat.findOne({ where: { id } });
}

export async function removeById(id) {
  const findMatch = await Chat.findOne({ where: { id } });
  await findMatch.destroy();
  return true;
}

export async function create(chat) {
  return Chat.create(chat).then((data) => data.dataValues.id);
}
