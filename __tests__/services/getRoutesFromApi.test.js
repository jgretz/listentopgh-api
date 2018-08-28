import axios from 'axios';
import {getRoutesFromApi} from '../../src/services';
import {
  BUS_API_URL,
  BUS_API_KEY,
  BUS_FEED,
  BUSTIME_RESPONSE,
} from '../../src/constants';

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

describe('getRoutes', () => {
  let result = null;
  let url = null;
  beforeAll(async () => {
    axios.get.mockReturnValue({status: 200, data: routesData});

    result = await getRoutesFromApi();
    url = axios.get.mock.calls[0][0];
  });

  it('should make a get call', () => {
    expect(axios.get).toHaveBeenCalled();
  });

  it('should call the bus api', () => {
    expect(url).toStartWith(BUS_API_URL);
  });

  it('should include the api key', () => {
    expect(url).toInclude(`key=${BUS_API_KEY}`);
  });

  it('should should set the data feed to the bus feed', () => {
    expect(url).toInclude(`rtpidatafeed=${BUS_FEED}`);
  });

  it('should return an array', () => {
    expect(result).toBeArray();
  });
});
