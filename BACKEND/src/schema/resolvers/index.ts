import { getWishListsByUser } from './wishlist/get-wishlists-by-user';
import { addProductToWishList } from './product/add-product-to-wishlist';
import { deleteProductToWishList } from './product/delete-product-to-wishlist';
import { editWishList } from './wishlist/edit-wishlist';
import { getWishListById } from './wishlist/get-wishlist-by-id';
import { createWishList } from './wishlist/create-wishlist';
import { deleteWishList } from './wishlist/delete-wishlist';
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

export const resolvers = {
  Query: {
    getProducts,
    getProductById,
    getCartById,
    getWishListById,
    getWishListsByUser,
    getClient,
    getLoggedUser,
  },
  Mutation: {
    createCart,
    deleteCart,
    createWishList,
    deleteWishList,
    deleteProductToWishList,
    editWishList,
    addProductToWishList,
    editClient,
    changePassword,
    signIn,
    //Login as Mutation to record activity
    logIn
  }
}