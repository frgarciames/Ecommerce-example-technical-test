import { Model } from 'objection';
import { Client } from './client';
import { Product } from './product';

export class Cart extends Model {

  static get tableName() {
    return 'cart';
  }

  static get relationMappings() {
    return {
      client: {
        relation: Model.BelongsToOneRelation,
        modelClass: Client,
        join: {
          from: 'cart.client_id',
          to: 'client.id'
        }
      }
    }
  }

};