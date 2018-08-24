import boot from '../src/boot';
import nodeBits from 'node-bits';
import nodeBitsExpress from 'node-bits-express';
import nodeBitsCode from 'node-bits-code';
import nodeBitsSql from 'node-bits-sql';
import nodeBitsSpa from 'node-bits-spa';

describe('Boot', () => {
  beforeAll(() => {
    boot();
  });

  it('should only call node-bits once', () => {
    expect(nodeBits).toHaveBeenCalledTimes(1);
  });

  it('should pass an array to node-bits', () => {
    expect(nodeBits.mock.calls[0][0]).toBeInstanceOf(Array);
  });

  it('should invoke node-bits-express', () => {
    expect(nodeBitsExpress).toHaveBeenCalled();
  });

  it('should invoke node-bits-code', () => {
    expect(nodeBitsCode).toHaveBeenCalled();
  });

  it('should invoke node-bits-sql', () => {
    expect(nodeBitsSql).toHaveBeenCalled();
  });

  it('should invoke node-bits-spa', () => {
    expect(nodeBitsSpa).toHaveBeenCalled();
  });

  it('should set the dev port to 4005', () => {
    expect(nodeBitsExpress.mock.calls[0][0].port).toBe(4005);
  });
});
