import { handleUserNotAuth } from './../../../helpers/handle-error';
import { WishList } from './../../../models/wishlist';

export const createWishList = async (_, params, { user }) => {
  if (!user) {
    return handleUserNotAuth();
  }
  const { name, priv } = params
  const wishList: any = await WishList.query<any>().insert({
    name: name.trim(),
    client_id: user.id,
    createdAt: new Date(),
    priv
  });
  return wishList;
}