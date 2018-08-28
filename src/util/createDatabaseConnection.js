import Sequelize from 'sequelize';
import {parse} from 'pg-connection-string';
import {DATABASE_CONNECTION} from '../constants';

export default () => {
  const dbConnectionString = DATABASE_CONNECTION;
  const dbConfig = parse(dbConnectionString);

  // wrap it up
  return new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    dialect: 'postgres',
    host: dbConfig.host,
    dialectOptions: {
      ssl: false,
    },

    sync: {
      logging: false,
    },
  });
};
