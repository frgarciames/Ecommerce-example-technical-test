import { WishList } from './wishlist';
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
      },
      whislist: {
        relation: Model.BelongsToOneRelation,
        modelClass: WishList,
        join: {
          from: 'product.wishlist_id',
          to: 'wishlist.id'
        }
      }
    }
  }

};