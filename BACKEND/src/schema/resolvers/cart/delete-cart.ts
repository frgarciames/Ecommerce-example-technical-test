import { handleUserNotAuth, handleError } from './../../../helpers/handle-error';
import { Cart } from './../../../models/cart';
import { Product } from '../../../models/product';

export const deleteCart = async (_, params, { user }) => {
  if (!user) {
    return handleUserNotAuth();
  }

  const { id } = params;

  const cart: any = await Cart.query().findById(id).first();
  if (cart) {
    try {
      await Product.query().where('cart_id', cart.id).del();
      await Cart.query().where('id', id).del()

      return {
        id,
        response: 'OK'
      }
    } catch (err) {
      return handleError({
        message: `Error trying to delete cart with id: ${id}`
      })
    }

  }
  return {
    id,
    response: `Error. Cart with id: ${id} not exist`,
  }

}