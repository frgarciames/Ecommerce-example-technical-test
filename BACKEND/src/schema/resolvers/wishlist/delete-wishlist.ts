import { handleUserNotAuth, handleError } from './../../../helpers/handle-error';
import { WishList } from './../../../models/wishlist';
import { Product } from '../../../models/product';

export const deleteWishList = async (_, params, { user }) => {
  if (!user) {
    return handleUserNotAuth();
  }

  const { id } = params;
  const wishList: any = await WishList.query().findById(id);
  if (wishList) {
    if (wishList.client_id === user.id) {
      try {
        await Product.query().where('wishlist_id', wishList.id).del();
        await WishList.query().where('id', id).del()

        return {
          id,
          response: 'OK'
        }
      } catch (err) {
        return handleError({
          message: `Error trying to delete wishlist with id: ${id}`
        })
      }

    }
    return {
      id,
      response: `Error. You have no permission to delete this wishlist`
    }
  }
  return {
    id,
    response: `Error. Wishlist with id: ${id} not exist`,
  }

}