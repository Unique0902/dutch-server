import { sequelize } from '../services/database.js';
import { FindMatch } from './findMatch.js';
import { ChattingRoom } from './chattingRoom.js';
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

export async function removeById(id) {
  const match = await Match.findOne({ where: { id } });
  const chattingRoom = await ChattingRoom.findOne({ where: { matchId: id } });
  getSocketIo()
    .in(chattingRoom.dataValues.id)
    .emit('match-delete', match.dataValues);
  await match.destroy();
  return true;
}

export async function create(match) {
  return Match.create(match).then((data) => {
    getSocketIo().emit('match-make', data.dataValues);
    return data.dataValues.id;
  });
}
