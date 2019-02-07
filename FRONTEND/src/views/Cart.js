import React, { Component, Fragment } from 'react';
import ProductCard from '../components/product-card';
import '../styles/views/_home.scss'
import { withContext } from '../utils/withContext';
import '../styles/views/_cart.scss';

class Cart extends Component {
  constructor() {
    super();
  }

  render() {
    const { cart } = this.props.context.state;
    return (
      <Fragment>
        {/* <input type="text" onChange={this.handleOnChange} /> */}
        <div className="cart-container">
          {
            cart && cart.map(prod => {
              return (
                <ProductCard
                  product={prod}
                  key={prod.id}
                  onClickNavigation={() => this.handleOnClick(prod.id)}
                  addToCart={this.props.context.addProductToCart}
                  addToWishList={() => { }}
                  mode='cart'
                />
              )
            })
          }
        </div>
        {cart && cart.length > 0 ? (
          <div className="cart-footer">
            <span>Total: {cart && cart.reduce((acc, prod) => acc + (prod.price * prod.amount), 0)}</span>
          </div>
        ) : ''}
      </Fragment>
    )
  }

}

export default withContext(Cart);