import { sequelize } from '../services/database.js';
import { FindMatch } from './findMatch.js';
import SQ from 'sequelize';
const DataTypes = SQ.DataTypes;

export const Match = sequelize.define('match', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: true,
  },
});
Match.hasOne(FindMatch, {
  foreignKey: {
    name: 'matchId',
    allowNull: true,
  },
});
Match.belongsTo(FindMatch, { foreignKey: 'matchData1' });
Match.belongsTo(FindMatch, { foreignKey: 'matchData2' });

export async function all() {
  return Match.findAll().then((data) => console.log(data));
}

export async function findById(id) {
  return Match.findOne({ where: { id } });
}

export async function removeById(id) {
  const match = await Match.findOne({ where: { id } });
  await match.destroy();
  return id;
}

export async function create(match) {
  return Match.create(match).then((data) => data.dataValues.id);
}
