import configureDatabaseConnection from '../../src/util/configureDatabaseConnection';
import Sequelize from 'sequelize';

describe('Configure Database Connection', () => {
  it('should return a Sequelize instance', () => {
    const db = configureDatabaseConnection();

    expect(db).toBeInstanceOf(Sequelize);
  });
});
