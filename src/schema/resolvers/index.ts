import { editClient } from './client/edit-client';
import { createCart } from './cart/create-cart';
import { deleteCart } from './cart/delete-cart';
import { logIn } from './login/login';
import { signIn } from './login/signin';
import { getClient } from './client/get-client';
import { getProducts } from './product/get-products';
import { getCartById } from './cart/get-cart-by-id';
import { getCarts } from './cart/get-carts';

export const resolvers = {
  Query: {
    getProducts,
    getCartById,
    getClient,
    getCarts,
  },
  Mutation: {
    createCart,
    deleteCart,
    editClient,
    signIn,
    //Login as Mutation to record activity
    logIn
  }
}