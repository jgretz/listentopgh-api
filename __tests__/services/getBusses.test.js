import axios from 'axios';
import {getBusses} from '../../src/services';
import {BUS_API_URL, BUS_API_KEY, BUSTIME_RESPONSE} from '../../src/constants';

const routesData = {
  [BUSTIME_RESPONSE]: {
    routes: [
      {
        rt: '1',
        rtnm: 'FREEPORT ROAD',
        rtclr: '#3300cc',
        rtdd: '1',
        rtpidatafeed: 'Port Authority Bus',
      },
      {
        rt: '11',
        rtnm: 'FINEVIEW',
        rtclr: '#ffccff',
        rtdd: '11',
        rtpidatafeed: 'Port Authority Bus',
      },
    ],
  },
};

const busData = {
  [BUSTIME_RESPONSE]: {
    vehicle: [
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
    ],
  },
};

describe('getRoutes', () => {
  let result = null;
  beforeAll(async () => {
    axios.get.mockImplementation(url => {
      if (url.includes('getroutes')) {
        return {
          status: 200,
          data: routesData,
        };
      }

      return {
        status: 200,
        data: busData,
      };
    });

    result = await getBusses();
  });

  it('should make a get call', () => {
    expect(axios.get).toHaveBeenCalled();
  });

  it('should call the bus api', () => {
    axios.get.mock.calls.forEach(([url]) => {
      expect(url).toStartWith(BUS_API_URL);
    });
  });

  it('should include the api key', () => {
    axios.get.mock.calls.forEach(([url]) => {
      expect(url).toInclude(`key=${BUS_API_KEY}`);
    });
  });

  it('should return an array', () => {
    expect(result).toBeArray();
  });
});
