import nodeBits, {GET, POST, PUT, DELETE, OPTIONS} from 'node-bits';
import nodeBitsExpress, {cors, bodyParser} from 'node-bits-express';
import nodeBitsCode from 'node-bits-code';
import nodeBitsSpa from 'node-bits-spa';
import nodeBitsSql from 'node-bits-sql';
import nodeBitsScheduler from 'node-bits-scheduler';

import {
  configureCompression,
  createDatabaseConnection,
  configureCache,
  configureTasks,
} from './util';

export default () => {
  nodeBits([
    nodeBitsExpress({
      port: 4005,
      configurations: [
        cors({
          methods: [GET, POST, PUT, DELETE, OPTIONS],
        }),
        bodyParser(),
        configureCache(),
        configureCompression(),
      ],
    }),
    nodeBitsCode({
      path: `${__dirname}`,
    }),
    nodeBitsSpa({
      path: `${__dirname}/site`,
    }),
    nodeBitsSql({connection: createDatabaseConnection}),
    nodeBitsScheduler({
      jobs: configureTasks(),
    }),
  ]);
};
