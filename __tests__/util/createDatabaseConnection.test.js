import configureDatabaseConnection from '../../src/util/createDatabaseConnection';
import Sequelize from 'sequelize';

describe('Configure Database Connection', () => {
  it('should return a Sequelize instance', () => {
    configureDatabaseConnection();

    expect(Sequelize).toHaveBeenCalled();
  });
});
