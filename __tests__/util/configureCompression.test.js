import configureCompression from '../../src/util/configureCompression';
import compression from 'compression';
import {PRODUCTION} from '../../src/constants';

describe('Configure Compression', () => {
  const app = {
    use: jest.fn(),
  };

  it('should do nothing if in development', () => {
    process.env.ENV = null;
    configureCompression()(app);

    expect(app.use).not.toHaveBeenCalled();
  });

  it('should invoke compression if in production', () => {
    process.env.ENV = PRODUCTION;
    configureCompression()(app);

    expect(compression).toHaveBeenCalled();
  });

  it('should invoke app.use if in production', () => {
    process.env.ENV = PRODUCTION;
    configureCompression()(app);

    expect(app.use).toHaveBeenCalled();
  });
});
