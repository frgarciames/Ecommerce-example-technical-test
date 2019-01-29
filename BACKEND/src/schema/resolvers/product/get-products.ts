import Cache from '../../../services/cache';
import { ifDataNotInCache, SMALLAPP, DISHWASHERS } from './utils';

export const getProducts = async (_, params) => {
  const { from } = params;
  if (!from) {
    const dataSmallApp = await Cache.get(`products__${SMALLAPP}`, () => ifDataNotInCache(SMALLAPP));
    const dataDishwashers = await Cache.get(`products__${DISHWASHERS}`, () => ifDataNotInCache(DISHWASHERS));
    return [ ...dataSmallApp, ...dataDishwashers ]
  } else if (from !== 'small-app' && from !== 'dishwashers') {
    throw new Error('Unexpected from param');
  }
  const data = await Cache.get(`products__${from}`, () => ifDataNotInCache(from));

  return data;
}