import { handleError } from './../../../helpers/handle-error';
import Cache from '../../../services/cache';
import { ifDataNotInCache, SMALLAPP, DISHWASHERS } from './utils';

export const getProducts = async (_, params) => {
  const { from, limit, offset, orderBy, search } = params;
  let output;
  if (!from) {
    const dataSmallApp = await Cache.get(`products__${SMALLAPP}`, () => ifDataNotInCache(SMALLAPP));
    const dataDishwashers = await Cache.get(`products__${DISHWASHERS}`, () => ifDataNotInCache(DISHWASHERS));
    let dataMerged = [...dataSmallApp, ...dataDishwashers];

    // FILTER SEARCH
    if (search) {
      dataMerged = filterDataBySearch(dataMerged, search);
    }

    output = {
      products: dataMerged,
      hasNextPage: false
    }

    // ORDER RESULTS
    if (dataMerged.length > 0) {
      if (orderBy && (orderBy === 'name' || orderBy === 'price')) {
        orderData(dataMerged, orderBy);
      }
      // IF NEXT PAGE
      const finalData = dataMerged.slice(offset, offset + limit);
      const lengthDataMerged = dataMerged.length;
      const indexOfIdFinalData = dataMerged.map(el => (
        el.id
      )).indexOf(finalData[finalData.length - 1].id) + 1;

      output = {
        products: finalData,
        hasNextPage: !(lengthDataMerged === indexOfIdFinalData)
      }
    }



    return output;

  } else if (from !== 'small-app' && from !== 'dishwashers') {
    return handleError({
      message: `Unexpected from param`
    })
  }

  let data = await Cache.get(`products__${from}`, () => ifDataNotInCache(from));

  // FILTER SEARCH
  if (search) {
    data = filterDataBySearch(data, search);
  }

  output = {
    products: data,
    hasNextPage: false
  }

  // ORDER RESULTS
  if (data.length > 0) {
    if (orderBy && (orderBy === 'name' || orderBy === 'price')) {
      orderData(data, orderBy);
    }

    // IF NEXT PAGE
    const finalData = data.slice(offset, offset + limit);
    const lengthDataMerged = data.length;
    const indexOfIdFinalData = data.map(el => (
      el.id
    )).indexOf(finalData[finalData.length - 1].id) + 1;

    output = {
      products: finalData,
      hasNextPage: !(lengthDataMerged === indexOfIdFinalData)
    }
  }

  return output;

}

const filterDataBySearch = (data, search) => data.filter(el => (
  new RegExp(`^.*${search.toLowerCase()}.*$`).test(el.name.toLowerCase()))
)

const orderData = (data, orderBy) => {
  data.sort((a, b) => {
    if (typeof a[orderBy] === 'string') {
      return ('' + a[orderBy]).localeCompare(b[orderBy])
    }
    return a[orderBy] - b[orderBy]
  })
}