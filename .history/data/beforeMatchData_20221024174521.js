import { sequelize } from '../services/database.js';
import { User } from './auth.js';
import SQ from 'sequelize';
const DataTypes = SQ.DataTypes;

export const BeforeMatchData = sequelize.define('beforeMatchData', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  slat: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  slng: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  alat: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  alng: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  srad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  arad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isMatching: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
BeforeMatchData.belongsTo(User, { foreignKey: 'uid' });

export async function all() {
  return BeforeMatchData.findAll();
}

export async function findByUid(uid) {
  return BeforeMatchData.findOne({ where: { uid } });
}

export async function removeByUid(uid) {
  const beforeMatchData = await BeforeMatchData.findOne({ where: { uid } });
  await beforeMatchData.destroy();
  return true;
}
export async function findById(id) {
  return BeforeMatchData.findOne({ where: { id } });
}
export async function updateMatchingById(id, matchId) {
  await BeforeMatchData.update(
    { isMatching: true, matchId },
    {
      where: {
        id,
      },
    }
  );
}

export async function removeById(id) {
  const beforeMatchData = await BeforeMatchData.findOne({ where: { id } });
  await beforeMatchData.destroy();
  return true;
}

export async function create(beforeMatchData) {
  return BeforeMatchData.create(beforeMatchData).then(
    (data) => data.dataValues.id
  );
}
