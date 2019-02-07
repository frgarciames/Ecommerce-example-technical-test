import { handleError } from './../../../helpers/handle-error';
import { WishList } from '../../../models/wishlist';
import { Product } from '../../../models/product';
import { handleUserNotAuth } from '../../../helpers/handle-error';

export const deleteProductToWishList = async (_, params, { user }) => {
  if (!user) {
    return handleUserNotAuth();
  }

  const { id } = params;
  const product: any = await Product.query().findById(id);
  const wishList: any = await WishList.query().findById(product.wishlist_id);
  if (user.id === wishList.client_id) {
    const rowsAffected = await Product.query().findById(id).del();
    if (rowsAffected === 1) {
      return {
        id,
        response: 'OK'
      }
    }
  }
  return handleError({
    message: `Error trying to delete cart with id: ${id}`
  })

}