import moment from 'moment';
import {logError} from 'node-bits';
import {getBussesForDay} from '../../services';

const DATE_FORMAT = 'MM-DD-YYYY';
const respondWithError = res => {
  res.status(500).send();
};

export default class BusLocationsForDay {
  registerDatabase(database) {
    this.database = database;
  }

  async get(req, res) {
    if (!req.query || !req.query.day) {
      respondWithError(res);
      return;
    }

    const {day: dayString} = req.query;
    const day = moment(dayString, DATE_FORMAT);
    if (!day.isValid()) {
      respondWithError(res);
      return;
    }

    try {
      const busses = await getBussesForDay(this.database, day.utc());
      res.json(busses);
    } catch (err) {
      logError(err);
      respondWithError(res);
    }
  }
}
