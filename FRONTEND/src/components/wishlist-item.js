import React from 'react';
import '../styles/components/_wishlist-item.scss';

export const WishListItem = ({ wishList, handleOnClick }) => (
  <div
    onClick={handleOnClick}
    className='wishlist-item__container'
    title={`Go to ${wishList.name}`}
  >
    <p className='wishlist-item__name'>{wishList.name}</p>
    <p className='wishlist-item__private'>{wishList.priv ? 'Private' : 'Public'}</p>
  </div>
)