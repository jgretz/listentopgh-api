import moment from 'moment';
import {getBussesFromApi} from '../services';

export default async database => {
  const locations = await getBussesFromApi();
  const now = moment().toDate();

  await Promise.all(
    locations.map(loc => {
      loc.collectedOn = now;

      return database.create('busLocation', loc);
    }),
  );

  await database.create('captureLog', {
    count: locations.length,
    collectedOn: now,
  });
};
