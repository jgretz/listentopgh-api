import * as services from '../../src/services';

// mock api call
const busData = [
  {
    routeName: 'FREEPORT ROAD',
    color: '#3300cc',
    vid: '6302',
    timestamp: '20180824 11:24',
    latitude: '40.455123554576524',
    longitude: '-79.99396514892578',
    speed: 20,
  },
  {
    routeName: 'FREEPORT ROAD',
    color: '#3300cc',
    vid: '6311',
    timestamp: '20180824 11:24',
    latitude: '40.56424719388367',
    longitude: '-79.76607150718814',
    speed: 0,
  },
  {
    routeName: 'FREEPORT ROAD',
    color: '#3300cc',
    vid: '5510',
    timestamp: '20180824 11:24',
    latitude: '40.60289334383878',
    longitude: '-79.75325955477628',
    speed: 16,
  },
];

describe('Capture Bus Locations', () => {
  const database = {
    create: jest.fn(),
  };

  const getBussesFromApi = jest.fn(() => busData);

  beforeAll(async () => {
    // the import needs to be after the mock, and we don't want hoisting for this internal function
    // but we also don't want to call the api everytime the test suite runs
    jest.doMock('../../src/services/index', () => ({
      ...services,
      getBussesFromApi,
    }));
    const captureBusLocations = require('../../src/tasks/captureBusLocations')
      .default;

    // call
    await captureBusLocations(database);
  });

  it('should request current bus locations', () => {
    expect(getBussesFromApi).toHaveBeenCalled();
  });

  it('should call create for each location', () => {
    const busLocationCalls = database.create.mock.calls.filter(
      call => call[0] === 'busLocation',
    );

    expect(busLocationCalls).toHaveLength(busData.length);
  });

  it('should create a log for the batch', () => {
    const busLocationCalls = database.create.mock.calls.filter(
      call => call[0] === 'captureLog',
    );

    expect(busLocationCalls).toHaveLength(1);
  });
});
