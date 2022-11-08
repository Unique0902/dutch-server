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
  status: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});
BeforeMatch.hasOne(BeforeMatchData, {
  foreignKey: {
    name: 'beforeMatchId',
    allowNull: true,
  },
});
BeforeMatch.belongsTo(BeforeMatchData, { foreignKey: 'matchData1Id' });
BeforeMatch.belongsTo(BeforeMatchData, { foreignKey: 'matchData2Id' });

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
export async function updatePromiseId(id, beforePromiseId) {
  await BeforeMatch.update(
    { beforePromiseId },
    {
      where: {
        id,
      },
    }
  );
}

export async function create(match) {
  return BeforeMatch.create(match).then((data) => data.dataValues.id);
}
