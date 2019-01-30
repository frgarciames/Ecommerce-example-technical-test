import React, { Component, Fragment } from 'react';
import { graphqlRequestWithNoToken } from '../services/graphql.service.';

class Home extends Component {

  state = {
    products: []
  }

  async componentDidMount() {
    const data = await graphqlRequestWithNoToken({
      query: `query {
        getProducts {
          id,
          name,
          price,
          image
        }
      }`
    });

    this.setState({
      products: data.data.getProducts
    })
  }

  render() {
    return (
      <Fragment>
        <div className="home-container">
          {
            this.state.products ? this.state.products.map(prod => {
              return (
                <div className="card" key={prod.id}>
                  <img src={prod.image} alt="Avatar" className="img-card" />
                  <div className="container">
                    <h4>{prod.name}</h4>
                    <p>From: $ {prod.price}</p>
                  </div>
                </div>
              )
            }) : ''
          }
        </div>
      </Fragment>
    )
  }

}

export default Home;