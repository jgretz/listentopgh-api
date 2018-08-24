import _ from 'lodash';
import axios from 'axios';
import {BUS_API_URL, BUS_API_KEY, BUSTIME_RESPONSE} from '../constants';
import getRoutes from './getRoutes';

export default async () => {
  const routes = await getRoutes();
  const chunkedRoutes = _.chunk(routes.map(x => x.rt), 10);

  const vehicleRequests = chunkedRoutes.map(routeGroup =>
    axios.get(
      `${BUS_API_URL}/getvehicles?key=${BUS_API_KEY}&format=json&rt=${routeGroup.join(
        ',',
      )}`,
    ),
  );
  const allVehicleResponses = await Promise.all(vehicleRequests);

  return _.flatten(
    _.union(
      allVehicleResponses.map(
        response => response.data[BUSTIME_RESPONSE].vehicle,
      ),
    ),
  )
    .filter(x => x)
    .map(vehicle => {
      const route = _.find(routes, rt => rt.rt === vehicle.rt) || {};

      return {
        routeName: route.rtnm,
        color: route.rtclr,
        vid: vehicle.vid,
        timestamp: vehicle.tmstmp,
        latitude: vehicle.lat,
        longitude: vehicle.lon,
        speed: vehicle.spd,
      };
    });
};
