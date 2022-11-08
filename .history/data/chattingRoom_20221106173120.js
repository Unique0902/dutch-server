import { sequelize } from '../services/database.js';
import { Match } from './match.js';
import { BeforeMatch } from './beforeMatch.js';
import { User } from './auth.js';
import SQ from 'sequelize';
const DataTypes = SQ.DataTypes;

export const ChattingRoom = sequelize.define('chattingroom', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  isNow: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});
ChattingRoom.belongsTo(BeforeMatch, { foreignKey: 'beforeMatchId' });
ChattingRoom.belongsTo(User, { foreignKey: 'user1Id' });
ChattingRoom.belongsTo(User, { foreignKey: 'user2Id' });

export async function all() {
  return ChattingRoom.findAll();
}

export async function updateChattingRoomById(id, beforeMatchId) {
  await ChattingRoom.update(
    { isNow: false, matchId: null, beforeMatchId },
    {
      where: {
        id,
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
