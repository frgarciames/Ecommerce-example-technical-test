import { handleUserNotAuth, handleError } from './../../../helpers/handle-error';
import { WishList } from '../../../models/wishlist';

export const editWishList = async (_, params, { user }) => {
  if (!user) {
    return handleUserNotAuth();
  }

  const { priv, name, id } = params;
  const wishList: any = await WishList.query().findById(id);
  if (user.id === wishList.client_id) {
    const wlMerged = { ...wishList, priv, name: name.trim() };
    const rowsAffected = await WishList.query().findById(id).update(wlMerged);
    if (rowsAffected === 1) {
      return WishList.query().findById(id);
    }
    return handleError({
      message: `Error trying to edit this wishlist`
    })
  }

  return handleError({
    message: `Error trying to edit this wishlist`
  })
}