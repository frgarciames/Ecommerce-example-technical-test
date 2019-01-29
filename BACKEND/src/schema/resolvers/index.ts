import { getProductById } from './product/get-product-by-id';
import { changePassword } from './login/change-password';
import { getLoggedUser } from './login/get-logged-user';
import { editClient } from './client/edit-client';
import { createCart } from './cart/create-cart';
import { deleteCart } from './cart/delete-cart';
import { logIn } from './login/login';
import { signIn } from './login/signin';
import { getClient } from './client/get-client-by-id';
import { getProducts } from './product/get-products';
import { getCartById } from './cart/get-cart-by-id';
import { getCarts } from './cart/get-carts';

export const resolvers = {
  Query: {
    getProducts,
    getProductById,
    getCartById,
    getClient,
    getLoggedUser,
  },
  Mutation: {
    createCart,
    deleteCart,
    editClient,
    changePassword,
    signIn,
    //Login as Mutation to record activity
    logIn
  }
}