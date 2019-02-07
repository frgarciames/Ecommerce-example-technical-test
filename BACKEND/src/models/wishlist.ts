import { Model } from 'objection';
import { Client } from './client';
import { Product } from './product';

export class WishList extends Model {

  static get tableName() {
    return 'wishlist';
  }

  static get relationMappings() {
    return {
      client: {
        relation: Model.BelongsToOneRelation,
        modelClass: Client,
        join: {
          from: 'wishlist.client_id',
          to: 'client.id'
        }
      }
    }
  }

};