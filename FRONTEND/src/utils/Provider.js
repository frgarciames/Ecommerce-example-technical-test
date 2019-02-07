import React, { Component } from 'react';
import { Context } from './withContext';
import { getQueryLoggedUser } from '../helpers/query-constructors';
import { graphqlRequestWithNoToken, graphqlRequestWithToken } from '../services/graphql.service.';
import { getCookie } from '../helpers/cookie';

class AppProvider extends Component {

  state = {
    user: null,
    cart: []
  }

  setUser = (user) => {
    this.setState({
      user
    })
  }

  addProductToCart = (product) => {
    const productExist = this.state.cart.find(prod => prod.id === product.id);
    if (productExist) {
      productExist.amount++
    } else {
      product.amount = 1;
      const cart = [...this.state.cart, product];
      this.setState({
        cart
      })
    }
  }
  
  setUserInApp = async () => {
    const token = getCookie('token');
    if (token) {
      const data = await graphqlRequestWithToken({
        query: getQueryLoggedUser()
      });

      if (!data.errors) {
        const user = data.getLoggedUser;
        this.setUser(user);
      }
    }
  }

  async componentDidMount() {
    this.setUserInApp();
  }


  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          setUser: this.setUser,
          addProductToCart: this.addProductToCart,
          setUserInApp: this.setUserInApp
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default AppProvider;