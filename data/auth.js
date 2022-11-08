import { sequelize } from '../services/database.js';
import SQ from 'sequelize';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define('user', {
  uid: {
    type: DataTypes.STRING(40),
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  sex: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  age: {
    type: DataTypes.STRING(8),
    allowNull: false,
  },
});

export async function findByName(name) {
  return await User.findOne({ where: { name } });
}

export async function findByUid(uid) {
  return await User.findOne({ where: { uid } });
}

export async function createUser(user) {
  return await User.create(user).then((data) => data.dataValues.uid);
}
