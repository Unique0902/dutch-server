import { sequelize } from '../services/database.js';
import { User } from './auth.js';
import SQ from 'sequelize';
const DataTypes = SQ.DataTypes;

export const FindMatch = sequelize.define('findmatch', {
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
FindMatch.belongsTo(User, { foreignKey: 'uid' });

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
export async function findById(id) {
  return FindMatch.findOne({ where: { id } });
}
export async function onmatchById(id) {
  await FindMatch.update(
    { isMatching: true },
    {
      where: {
        id,
      },
    }
  );
}

export async function removeById(id) {
  const findMatch = await FindMatch.findOne({ where: { id } });
  await findMatch.destroy();
  return true;
}

export async function create(findMatch) {
  return FindMatch.create(findMatch).then((data) => data.dataValues.id);
}
