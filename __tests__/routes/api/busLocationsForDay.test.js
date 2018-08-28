import BusLocationsForDay from '../../../src/routes/api/busLocationsForDay';

describe('API', () => {
  describe('Bus Location For Day', () => {
    const makeRoute = (withError = false) => {
      const route = new BusLocationsForDay();
      route.registerDatabase({
        find: jest.fn(() => {
          if (withError) {
            throw new Error();
          }

          return [];
        }),
      });

      return route;
    };

    const makeRequest = async (day, withError) => {
      const route = makeRoute(withError);
      const req = {query: {day}};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
        send: jest.fn(),
      };

      await route.get(req, res);

      return res;
    };

    // tests
    it('should call res.json with an array for a valid date', async () => {
      const res = await makeRequest('01/01/2018');

      expect(res.json).toHaveBeenCalled();
    });

    it('should return a 500 if no date is provided', async () => {
      const res = await makeRequest();

      expect(res.status.mock.calls[0][0]).toBe(500);
    });

    it('should return a 500 for an invalid date', async () => {
      const res = await makeRequest('asdasdads');

      expect(res.status.mock.calls[0][0]).toBe(500);
    });

    it('should catch error from database', async () => {
      const res = await makeRequest('01/01/2018', true);

      expect(res.status.mock.calls[0][0]).toBe(500);
    });

    it('should register the database', () => {
      const route = makeRoute();

      expect(route.registerDatabase).toBeFunction();
      expect(route.database).toBeDefined();
    });
  });
});
