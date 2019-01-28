import { Cart } from './cart';
import { Model } from 'objection';

export class Product extends Model {

  static get tableName() {
    return 'product';
  }

  static get relationMappings() {
    return {
      cart: {
        relation: Model.BelongsToOneRelation,
        modelClass: Cart,
        join: {
          from: 'product.cart_id',
          to: 'cart.id'
        }
      }
    }
  }

};