import NodeCache from 'node-cache';
import createCache from '../../src/cache/createCache';

describe('Create Cache', () => {
  it('should return an instance of NodeCache', () => {
    const cache = createCache();

    expect(cache).toBeInstanceOf(NodeCache);
  });
});
