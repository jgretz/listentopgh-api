import moment from 'moment';
import getBussesForDay from '../../src/services/getBussesForDay';

describe('Get Busses For Day', () => {
  const find = jest.fn(() => []);
  beforeAll(async () => {
    await getBussesForDay({find}, moment());
  });

  it('should call find on the busLocation object', () => {
    expect(find.mock.calls[0][0]).toBe('busLocation');
  });

  it('should return an array', () => {
    expect(find.mock.results[0].value).toBeInstanceOf(Array);
  });
});
