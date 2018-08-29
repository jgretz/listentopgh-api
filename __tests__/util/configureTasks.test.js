import configureTasks from '../../src/util/configureTasks';
import captureBusLocations from '../../src/tasks/captureBusLocations';
import {PRODUCTION} from '../../src/constants';

describe('Configure Tasks', () => {
  it('should return an empty array in development', () => {
    const tasks = configureTasks();

    expect(tasks).toBeArrayOfSize(0);
  });

  it('should return an array with 1 task in production', () => {
    process.env.ENV = PRODUCTION;
    const tasks = configureTasks();

    expect(tasks).toBeArrayOfSize(1);
  });

  it('should return a task with the rule property set to a string', () => {
    process.env.ENV = PRODUCTION;
    const tasks = configureTasks();

    expect(tasks[0].rule).toBeString();
  });

  it('should return a task with the job property set to capture bus location', () => {
    process.env.ENV = PRODUCTION;
    const tasks = configureTasks();

    expect(tasks[0].job).toBe(captureBusLocations);
  });
});
