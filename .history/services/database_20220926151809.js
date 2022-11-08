import SQ from 'sequelize';
import { config } from '../config';
const { host, user, database, password } = config.db;
const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
});
