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
  blameData: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});
UserData.belongsTo(User, { foreignKey: 'userId' });

export async function all() {
  return UserData.findAll();
}

export async function updatePraiseData(userId, praiseData) {
  await ChattingRoom.update(
    { praiseData },
    {
      where: {
        userId,
      },
    }
  );
}

export async function findByMatchId(matchId) {
  return ChattingRoom.findOne({ where: { matchId } });
}

export async function findById(id) {
  return ChattingRoom.findOne({ where: { id } });
}

export async function removeById(id) {
  const chattingRoom = await ChattingRoom.findOne({ where: { id } });
  await chattingRoom.destroy();
  return true;
}

export async function create(chattingRoom) {
  return ChattingRoom.create(chattingRoom).then((data) => data.dataValues.id);
}
