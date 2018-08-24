// apply private keys
const privateKeys = {};
try {
  const p = require('./private.js');
  privateKeys.busApiKey = p.BUS_API_KEY;
  privateKeys.databaseConnection = p.DATABASE_CONNECTION;
} catch (err) {
  privateKeys.busApiKey = process.env.busApiKey;
  privateKeys.databaseConnection = process.env.databaseConnection;
}

export const BUS_API_KEY = privateKeys.busApiKey;
export const DATABASE_CONNECTION = privateKeys.databaseConnection;

// apply public constants
export const PRODUCTION = 'PRODUCTION';
export const BUS_FEED = 'Port Authority Bus';
export const CACHED_ROUTES = ['/api/version', '/api/busLocationsForDay'];
