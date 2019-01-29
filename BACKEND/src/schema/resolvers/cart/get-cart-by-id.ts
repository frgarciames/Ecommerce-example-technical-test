import { Cart } from '../../../models/cart';
import { Product } from '../../../models/product';

export const getCartById = async (_, params, { user }) => {
  if (!user) {
    throw new Error('You are not authenticated!')
  }

  const { id } = params;

  const prevCart: any = await Cart.query().findById(id).first();
  const products = Product.query().where('cart_id', prevCart.id);

  const cart = { ...prevCart, products };

  return cart;
}