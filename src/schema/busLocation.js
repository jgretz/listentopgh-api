export default {
  routeName: String,
  color: String,
  vid: String,
  timestamp: String,
  latitude: String,
  longitude: String,
  speed: Number,
  collectedOn: Date,
};

export const busLocationCollectedOnIndex = {
  model: 'busLocation',
  fields: [{field: 'collectedOn'}],
};
