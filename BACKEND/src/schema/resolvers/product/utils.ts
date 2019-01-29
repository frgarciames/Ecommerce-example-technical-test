import * as fs from 'fs';
import * as path from 'path';

export const SMALLAPP = 'small-app';
export const DISHWASHERS = 'dishwashers';

export const ifDataNotInCache = (from) => {
  const json = JSON.parse(
    fs.readFileSync(
      path.join(
        __dirname + '../../../../external-data') + `/${from}.json`, 'utf8'
    )
  );
  return Promise.resolve(json)
}