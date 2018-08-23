// apply settings
const privateKeys = {};
try {
  const p = require('./private.js');
  privateKeys.busApiKey = p.BUS_API_KEY;
} catch (err) {
  privateKeys.busApiKey = process.env.busApiKey;
}

export const BUS_API_KEY = privateKeys.busApiKey;
export const BUS_FEED = 'Port Authority Bus';
