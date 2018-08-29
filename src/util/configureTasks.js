import {isDev} from '../services';
import {captureBusLocations} from '../tasks';

export default () => {
  if (isDev()) {
    return [];
  }

  return [
    {
      rule: '*/1 * * * *',
      job: captureBusLocations,
    },
  ];
};
