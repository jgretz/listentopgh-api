import _ from 'lodash';
import {POST, PUT, DELETE} from 'node-bits';
import createCache from './createCache';

const DEFAULT_CACHE = createCache();
const PASS_ON_VERBS = [POST, PUT, DELETE];

export default ({routes, overrideCache}) => {
  const cache = overrideCache || DEFAULT_CACHE;

  return (req, res, next) => {
    // pass cache down so handlers can use it
    req.cache = cache;

    // don't handle these verbs
    if (PASS_ON_VERBS.includes(req.method)) {
      next();
      return;
    }

    // test if we are to cache this request by url
    if (!_.some(routes, url => req.url.startsWith(url))) {
      next();
      return;
    }

    // check cache
    const cachedResult = cache.get(req.url);
    if (cachedResult) {
      res.json(cachedResult);
      return;
    }

    // we use the wrap around to capture the default route's result
    res.jsonSend = res.json;
    res.json = results => {
      cache.set(req.url, results);

      res.jsonSend(results);
      res.json = res.jsonSend; // reset pointer
    };

    next();
  };
};
