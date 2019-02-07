import { WishList } from '../../../models/wishlist';
import { handleUserNotAuth } from '../../../helpers/handle-error';
import { Product } from '../../../models/product';

export const getWishListsByUser = async (_, params, { user }) => {
  if (!user) {
    return handleUserNotAuth();
  }
  const wishLists: any = await WishList.query().where('client_id', user.id);
  for (const wishList of wishLists) {
    const products = await Product.query().where('wishlist_id', wishList.id);
    wishList.products = [...products];
  }
  return wishLists;
}