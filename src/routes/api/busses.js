import _ from 'lodash';
import axios from 'axios';
import {BUS_API_KEY, BUS_FEED} from '../../constants';

export default async (req, res) => {
  const routesResponse = await axios.get(
    `http://truetime.portauthority.org/bustime/api/v3/getroutes?key=${BUS_API_KEY}&format=json&rtpidatafeed=${BUS_FEED}`
  );

  const {routes} = routesResponse.data['bustime-response'];
  const routesGrouped = _.chunk(routes.map(x => x.rt), 10);

  const vehicleRequests = routesGrouped.map(routeGroup =>
    axios.get(
      `http://truetime.portauthority.org/bustime/api/v3/getvehicles?key=${BUS_API_KEY}&format=json&rt=${routeGroup.join(
        ','
      )}`
    )
  );

  const allVehicleResponses = await Promise.all(vehicleRequests);
  const vehicles = _
    .flatten(
      _.union(
        allVehicleResponses.map(
          response => response.data['bustime-response'].vehicle
        )
      )
    )
    .filter(x => x)
    .map(vehicle => {
      const route = _.find(routes, rt => rt.rt === vehicle.rt);
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

  res.json(vehicles);
};
