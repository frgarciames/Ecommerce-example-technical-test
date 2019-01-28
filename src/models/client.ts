import { Model } from 'objection';
import * as path from 'path';

export class Client extends Model {

  static get tableName() {
    return 'client';
  }

};