import axios from 'axios';
import {BUS_API_KEY, BUS_FEED} from '../../constants';

export default async (req, res) => {
  const routes = await axios.get(
    `http://truetime.portauthority.org/bustime/api/v3/getroutes?key=${BUS_API_KEY}&format=json&rtpidatafeed=${BUS_FEED}`
  );

  res.json(routes.data);
};
