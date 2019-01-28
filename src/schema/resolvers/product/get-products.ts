import { Product } from '../../../models/product';
import * as fs from 'fs';
import * as path from 'path';
import Cache from '../../../services/cache';

const SMALLAPP = 'small-app';
const DISHWASHERS = 'dishwashers';

const ifDataNotInCache = (from) => {
  const json = JSON.parse(
    fs.readFileSync(
      path.join(
        __dirname + '../../../../external-data') + `/${from}.json`, 'utf8'
    )
  );
  return Promise.resolve(json)
}

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