import {cacheMiddleware} from '../../src/cache';

import {GET, POST, PUT, DELETE} from 'node-bits';
import {CACHED_ROUTES} from '../../src/constants/index';

describe('Cache Middleware', () => {
  // object
  const result = [];
  const cache = {
    get: jest.fn(),
    set: jest.fn(),
  };
  cache.get.mockImplementation(
    url => (url === CACHED_ROUTES[1] ? result : null),
  );

  const middleware = cacheMiddleware({
    routes: CACHED_ROUTES,
    overrideCache: cache,
  });

  // shared logic
  const makeCall = (method, url) => {
    const req = {
      method,
      url,
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    middleware(req, res, next);

    return {
      req,
      res,
      next,
    };
  };

  const nextTest = (method, url) => () => {
    const {next} = makeCall(method, url);
    expect(next).toHaveBeenCalled();
  };

  // tests
  it('should set the cache field on the request for future use', () => {
    const req = {
      method: GET,
      url: '',
    };
    middleware(req, {}, () => {});

    expect(req.cache).toBeDefined();
  });

  it('should call next for for POST requests', nextTest(POST, ''));
  it('should call next for for PUT requests', nextTest(PUT, ''));
  it('should call next for for DELETE requests', nextTest(DELETE, ''));

  it(
    'should call next for non-configured URLs',
    nextTest(GET, 'http://www.google.com'),
  );

  it('should check cache for configured URLs', () => {
    makeCall(GET, CACHED_ROUTES[0]);
    expect(cache.get).toHaveBeenCalled();
  });

  it('should call standard route when cache is empty', () => {
    const {next} = makeCall(GET, CACHED_ROUTES[0]);
    expect(next).toHaveBeenCalled();
  });

  it('should add result of standard result to cache when route returns', () => {
    const {res} = makeCall(GET, CACHED_ROUTES[0]);
    res.json(result);

    expect(cache.set).toHaveBeenCalled();
    expect(cache.set.mock.calls[0][0]).toBe(CACHED_ROUTES[0]);
    expect(cache.set.mock.calls[0][1]).toBe(result);
  });

  it('should return cached value when cache is filled', () => {
    const {res} = makeCall(GET, CACHED_ROUTES[1]);
    expect(res.json.mock.calls[0][0]).toBe(result);
  });

  it('should NOT call next when returning cached value', () => {
    const {next} = makeCall(GET, CACHED_ROUTES[1]);
    expect(next).not.toHaveBeenCalled();
  });
});
