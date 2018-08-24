import isDev from '../../src/services/isDev';
import {PRODUCTION} from '../../src/constants';

describe('Is Development Environment', () => {
  it('should return true if ENV flag is not set', () => {
    process.env.ENV = null;

    expect(isDev()).toBe(true);
  });

  it('should return true if ENV flag is not set to production', () => {
    process.env.ENV = 'QA';

    expect(isDev()).toBe(true);
  });

  it('should return false if ENV flag is set to production', () => {
    process.env.ENV = PRODUCTION;

    expect(isDev()).toBe(false);
  });
});
