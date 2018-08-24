import {configureCache} from '../../src/util';

describe('Configure Cache', () => {
  const app = {
    use: jest.fn(),
  };

  beforeAll(() => {
    configureCache()(app);
  });

  it('should register cache middleware in app', () => {
    expect(app.use).toHaveBeenCalled();
  });
});
