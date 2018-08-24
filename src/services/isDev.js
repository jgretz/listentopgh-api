import {PRODUCTION} from '../constants';

export default () => process.env.ENV !== PRODUCTION;
