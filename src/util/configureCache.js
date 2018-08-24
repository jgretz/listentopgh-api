import {cacheMiddleware} from '../cache';
import {CACHED_ROUTES} from '../constants';

export default () => app => {
  app.use(cacheMiddleware({routes: CACHED_ROUTES}));
};
