import { Product } from '../../../models/product';
import Cache from '../../../services/cache';
import { SMALLAPP, DISHWASHERS, ifDataNotInCache } from './utils';

export const getProductById = async (_, params) => {
  const { id } = params;
  const dataSmallApp = await Cache.get(`products__${SMALLAPP}`, () => ifDataNotInCache(SMALLAPP));
  const dataDishwashers = await Cache.get(`products__${DISHWASHERS}`, () => ifDataNotInCache(DISHWASHERS));

  const data = [...dataSmallApp, ...dataDishwashers]
  return data.find(prod => prod.id === id);
}