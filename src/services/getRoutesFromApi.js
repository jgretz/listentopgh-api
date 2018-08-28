import axios from 'axios';
import {
  BUS_API_URL,
  BUS_API_KEY,
  BUS_FEED,
  BUSTIME_RESPONSE,
} from '../constants';

export default async () => {
  const routes = await axios.get(
    `${BUS_API_URL}/getroutes?key=${BUS_API_KEY}&format=json&rtpidatafeed=${BUS_FEED}`,
  );

  return routes.data[BUSTIME_RESPONSE].routes;
};
