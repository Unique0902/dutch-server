import { sequelize } from '../services/database.js';
import { User } from './auth.js';
import SQ from 'sequelize';
const DataTypes = SQ.DataTypes;

const FindMatch = sequelize.define('findmatch', {
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
});
FindMatch.hasMany(User, { foreignKey: 'uid', as: 'uid1' });
FindMatch.hasMany(User, { foreignKey: 'uid' });

export async function all() {
  return FindMatch.findAll();
}

export async function findByUid(uid) {
  return FindMatch.findOne({ where: { uid } });
}

export async function removeByUid(uid) {
  const findMatch = await FindMatch.findOne({ where: { uid } });
  await findMatch.destroy();
  return true;
}

export async function create(findMatch) {
  return FindMatch.create(findMatch).then((data) => data.dataValues.uid);
}
