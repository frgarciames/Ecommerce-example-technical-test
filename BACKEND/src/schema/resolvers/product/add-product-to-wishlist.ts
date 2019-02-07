import { handleError } from './../../../helpers/handle-error';
import { WishList } from '../../../models/wishlist';
import { Product } from '../../../models/product';
import { handleUserNotAuth } from '../../../helpers/handle-error';

export const addProductToWishList = async (_, params, { user }) => {
  if (!user) {
    return handleUserNotAuth();
  }

  const { product: { name, price, amount, id, image }, idWishList } = params;
  const wishList: any = await WishList.query().findById(idWishList);

  if (wishList.client_id === user.id) {
    return Product.query<any>().insert({
      wishlist_id: wishList.id,
      'external-id': id,
      name,
      amount,
      price,
      owns: 'wishlist',
      image
    });
  }
  return handleError({
    message: `Error. You have no permission to add product to this wishlist`
  })
}