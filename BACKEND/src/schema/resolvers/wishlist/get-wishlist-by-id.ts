import { WishList } from './../../../models/wishlist';
import { Product } from '../../../models/product';
import { handleError } from '../../../helpers/handle-error';

export const getWishListById = async (_, params, { user }) => {

  const { id } = params;
  const prevWishList: any = await WishList.query().findById(id);
  if (prevWishList && (!prevWishList.priv || prevWishList.client_id === user.id)) {
    const products = Product.query().where('wishlist_id', prevWishList.id);
    const wishList = { ...prevWishList, products };
    return wishList;
  }
  return handleError({
    message: `Wishlist with id: ${id} does not exist`
  })
}