import React from 'react';
import '../styles/components/_modal-wishlist.scss';
import { WishListItem } from './wishlist-item';

export const ModalWishLists = ({ data, addToWishList, hide }) => (
  <div className='modal-wishlist__container'>
    <span
      className='modal-wishlist__cancel-icon'
      title='Exit'
      onClick={hide}
    >
      <i className="material-icons">
        cancel
      </i>
    </span>
    <p className='modal-wishlist__title'>
      Wich Wish List do you want to add this product ?
    </p>
    <form className='modal-wishlist__wrapper-items'>
      {data && (
        data.map(wl => (
          <WishListItem
            key={wl.id}
            handleOnClick={() => addToWishList(wl)}
            wishList={wl}
          />
        ))
      )}
    </form>
  </div>
)