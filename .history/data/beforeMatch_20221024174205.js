import { sequelize } from '../services/database.js';
import { BeforeMatchData } from './beforeMatchData.js';
import SQ from 'sequelize';
const DataTypes = SQ.DataTypes;

export const BeforeMatch = sequelize.define('beforeMatch', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});
BeforeMatch.hasOne(BeforeMatchData, {
  foreignKey: {
    name: 'matchId',
    allowNull: true,
  },
});
BeforeMatch.belongsTo(BeforeMatchData, { foreignKey: 'matchData1' });
BeforeMatch.belongsTo(BeforeMatchData, { foreignKey: 'matchData2' });

export async function all() {
  return BeforeMatch.findAll().then((data) => console.log(data));
}

export async function findById(id) {
  return BeforeMatch.findOne({ where: { id } });
}

export async function removeById(id) {
  const match = await BeforeMatch.findOne({ where: { id } });
  await match.destroy();
  return true;
}

export async function create(match) {
  return BeforeMatch.create(match).then((data) => data.dataValues.id);
}
