import Cache from '../../../services/cache';
import { ifDataNotInCache, SMALLAPP, DISHWASHERS } from './utils';

export const getProducts = async (_, params) => {
  const { from, limit, offset, orderBy } = params;
  if (!from) {
    const dataSmallApp = await Cache.get(`products__${SMALLAPP}`, () => ifDataNotInCache(SMALLAPP));
    const dataDishwashers = await Cache.get(`products__${DISHWASHERS}`, () => ifDataNotInCache(DISHWASHERS));
    const dataMerged = [...dataSmallApp, ...dataDishwashers];
    if (orderBy && (orderBy === 'name' || orderBy === 'price')) {
      dataMerged.sort((a, b) => {
        if(typeof a[orderBy] === 'string') {
          return ('' + a[orderBy]).localeCompare(b[orderBy])
        }
        return a[orderBy] - b[orderBy]
      })
    }
    const finalData = dataMerged.slice(offset, offset + limit);
    const lengthDataMerged = dataMerged.length;
    const indexOfIdFinalData = dataMerged.map(el => (
      el.id
    )).indexOf(finalData[finalData.length - 1].id) + 1;

    return {
      products: finalData,
      hasNextPage: !(lengthDataMerged === indexOfIdFinalData)
    }
  } else if (from !== 'small-app' && from !== 'dishwashers') {
    throw new Error('Unexpected from param');
  }
  const data = await Cache.get(`products__${from}`, () => ifDataNotInCache(from));

  return {
    products: data,
    hasNextPage: true
  };
}