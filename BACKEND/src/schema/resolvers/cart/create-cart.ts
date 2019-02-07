import { Client } from './../../../models/client';
import { Cart } from './../../../models/cart';
import { Product } from '../../../models/product';
import { handleUserNotAuth } from '../../../helpers/handle-error';

export const createCart = async (_, params, { user }) => {
  if (!user) {
    return handleUserNotAuth();
  }
  const { products } = params.input
  const total = products.reduce((acc, prod) => acc + (prod.price * prod.amount), 0)
  const client: any = await Client.query().findById(user.id);
  const cart: any = await Cart.query<any>().insert({
    client_id: client.id,
    createdAt: new Date(),
    total
  });
  products.map(async product => {
    const { name, amount, price, image } = product;
    const prod = await Product.query<any>().insert({
      cart_id: cart.id,
      'external-id': product.id,
      name,
      amount,
      price,
      owns: 'cart',
      image
    })
  })
  return cart;
}