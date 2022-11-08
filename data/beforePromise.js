import { sequelize } from '../services/database.js';
import { BeforeMatch } from './beforeMatch.js';
import SQ from 'sequelize';
const DataTypes = SQ.DataTypes;

export const BeforePromise = sequelize.define('beforePromise', {
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
  loc: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});
BeforePromise.hasOne(BeforeMatch, {
  foreignKey: {
    name: 'beforePromiseId',
    allowNull: true,
  },
});
BeforePromise.belongsTo(BeforeMatch, { foreignKey: 'beforeMatchId' });

export async function all() {
  return BeforePromise.findAll().then((data) => console.log(data));
}

export async function findById(id) {
  return BeforePromise.findOne({ where: { id } });
}

export async function removeById(id) {
  const promise = await BeforePromise.findOne({ where: { id } });
  await promise.destroy();
  return true;
}

export async function create(match) {
  return BeforePromise.create(match).then((data) => data.dataValues.id);
}
