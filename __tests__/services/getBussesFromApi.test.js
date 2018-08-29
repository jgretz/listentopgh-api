import axios from 'axios';
import {getBussesFromApi} from '../../src/services';
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
        vid: '5909',
        rtpidatafeed: 'Port Authority Bus',
        tmstmp: '20180829 13:13',
        lat: '40.47843763563368',
        lon: '-79.96866115993923',
        hdg: '304',
        pid: 6416,
        rt: '1',
        des: 'Tarentum',
        pdist: 22162,
        dly: false,
        spd: 11,
        tatripid: '1571',
        tablockid: '001 -015',
        zone: '',
        mode: 1,
      },
      {
        vid: '6310',
        rtpidatafeed: 'Port Authority Bus',
        tmstmp: '20180829 13:13',
        lat: '40.564109802246094',
        lon: '-79.77248023538029',
        hdg: '250',
        pid: 6416,
        rt: '1',
        des: 'Tarentum',
        pdist: 109317,
        dly: false,
        spd: 0,
        tatripid: '1566',
        tablockid: '001 -014',
        zone: '',
        mode: 1,
      },
      {
        vid: '6002',
        rtpidatafeed: 'Port Authority Bus',
        tmstmp: '20180829 13:13',
        lat: '40.574811037848974',
        lon: '-79.7777743620031',
        hdg: '168',
        pid: 6503,
        rt: '1',
        des: 'Downtown',
        pdist: 15907,
        dly: false,
        spd: 30,
        tatripid: '2051',
        tablockid: '001 -013',
        zone: '',
        mode: 1,
      },
      {
        vid: '1710',
        rtpidatafeed: 'Port Authority Bus',
        tmstmp: '20180829 13:12',
        lat: '40.44366333333333',
        lon: '-79.99503833333333',
        hdg: '0',
        pid: 6598,
        rt: '11',
        des: 'FINEVIEW LOOP',
        pdist: 2344,
        dly: false,
        spd: 0,
        tatripid: '1572',
        tablockid: '011 -130',
        zone: '',
        mode: 1,
      },
      {
        vid: '5907',
        rtpidatafeed: 'Port Authority Bus',
        tmstmp: '20180829 13:13',
        lat: '40.54637145996094',
        lon: '-80.00543975830078',
        hdg: '92',
        pid: 6394,
        rt: '12',
        des: 'McKnight-McCandless',
        pdist: 45698,
        dly: false,
        spd: 0,
        tatripid: '716',
        tablockid: '012 -144',
        zone: '',
        mode: 1,
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

    result = await getBussesFromApi();
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
