import { sequelize } from '../services/database.js';
import { User } from './auth.js';
import SQ from 'sequelize';
import { getSocketIo } from '../services/socket.js';
import { Match } from './match.js';
import { BeforeMatch } from './beforeMatch.js';
const DataTypes = SQ.DataTypes;

export const Promise = sequelize.define('promise', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  loc: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

Promise.belongsTo(Match, { foreignKey: 'matchId' });
Promise.belongsTo(BeforeMatch, { foreignKey: 'beforeMatchId' });

export async function all() {
  return Promise.findAll();
}

export async function findByMatchId(matchId) {
  return Promise.findAll({ where: { matchId } });
}

export async function findById(id) {
  return Promise.findOne({ where: { id } });
}

export async function removeById(id) {
  const promise = await Promise.findOne({ where: { id } });
  await promise.destroy();
  return true;
}

export async function create(promise) {
  getSocketIo().emit('promise-make', promise);
  return Promise.create(promise).then((data) => data.dataValues.id);
}
