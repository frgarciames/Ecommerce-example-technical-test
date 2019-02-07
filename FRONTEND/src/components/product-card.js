import React from 'react';
import '../styles/components/_product-card.scss';

const ProductCard = ({
  product: {
    image,
    name,
    price,
    amount
  },
  user,
  addToCart,
  addToWishList,
  onClickNavigation,
  product,
  mode
}) => (
    <div className="product-card">
      <img src={image} alt="Avatar" className="product-card__img" onClick={onClickNavigation} />
      <div className="product-card__info">
        <h4>{name}</h4>
        <p>From: $ {price}</p>
      </div>
      <div className="product-card__buttons">
        {
          mode === 'cart' ? (
            <p>{`Amount: ${amount}`}</p>
          ) : (
              <button className="product-card__buttons__button-card" onClick={() => addToCart(product)}>
                Add to Cart
                <i className="material-icons">
                  add_shopping_cart
                </i>
              </button>
            )
        }
        {
          user && (
            <button className="product-card__buttons__button-wl" onClick={() => addToWishList(product)}>
              Add to Wishlist
              <i className="material-icons">
                favorite_border
              </i>
            </button>
          )
        }
      </div>
    </div>
  )

export default ProductCard;