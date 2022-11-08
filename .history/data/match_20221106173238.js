import { sequelize } from '../services/database.js';
import { FindMatch } from './findMatch.js';
import { getSocketIo } from '../services/socket.js';
import SQ from 'sequelize';
const DataTypes = SQ.DataTypes;

export const Match = sequelize.define('match', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});
Match.hasOne(FindMatch, {
  foreignKey: {
    name: 'matchId',
    allowNull: true,
  },
});
Match.belongsTo(FindMatch, { foreignKey: 'matchData1Id' });
Match.belongsTo(FindMatch, { foreignKey: 'matchData2Id' });

export async function all() {
  return Match.findAll().then((data) => console.log(data));
}

export async function findById(id) {
  return Match.findOne({ where: { id } });
}

export async function removeById(id, roomId) {
  const match = await Match.findOne({ where: { id } });
  console.log('데이터는 ', roomId);
  getSocketIo().in(roomId).emit('match-delete', match.dataValues);
  await match.destroy();
  return true;
}

export async function create(match, uid) {
  return Match.create(match).then((data) => {
    getSocketIo().in(uid).emit('match-make', data.dataValues);
    return data.dataValues.id;
  });
}
