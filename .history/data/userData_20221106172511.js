import { sequelize } from '../services/database.js';
import { Match } from './match.js';
import { BeforeMatch } from './beforeMatch.js';
import { User } from './auth.js';
import SQ from 'sequelize';
const DataTypes = SQ.DataTypes;

export const UserData = sequelize.define('userdata', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  praiseData: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  blameData: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  blacklist: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});
UserData.belongsTo(User, { foreignKey: 'userId' });

export async function all() {
  return UserData.findAll();
}

export async function updatePraiseData(userId, praiseData) {
  await UserData.update(
    { praiseData },
    {
      where: {
        userId,
      },
    }
  );
}

export async function updateBlameData(userId, blameData) {
  await UserData.update(
    { blameData },
    {
      where: {
        userId,
      },
    }
  );
}

export async function updateBlacklist(userId, blacklist) {
  await UserData.update(
    { blacklist },
    {
      where: {
        userId,
      },
    }
  );
}

export async function findByMatchId(matchId) {
  return UserData.findOne({ where: { matchId } });
}

export async function findById(id) {
  return UserData.findOne({ where: { id } });
}

export async function removeByUid(userId) {
  const UserData = await UserData.findOne({ where: { userId } });
  await UserData.destroy();
  return true;
}

export async function create(userData) {
  return UserData.create(userData).then((data) => data.dataValues.id);
}
