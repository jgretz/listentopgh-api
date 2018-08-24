import * as bootModule from '../src/boot';

describe('Index', () => {
  beforeAll(() => {
    jest.spyOn(bootModule, 'default');
    require('../src/index.js');
  });

  it('should call boot', () => {
    expect(bootModule.default).toHaveBeenCalled();
  });
});
