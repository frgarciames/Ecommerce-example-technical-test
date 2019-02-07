import React, { Component, Fragment } from 'react';
import { withContext } from '../utils/withContext';
import { graphqlRequestWithToken } from '../services/graphql.service.';
import { getQueryGetWishListsByUser } from '../helpers/query-constructors';

class WishListsList extends Component {

  state = {
    wishLists: []
  }

  async componentDidMount() {
    const data = await graphqlRequestWithToken({
      query: getQueryGetWishListsByUser()
    });

    this.setState({
      wishLists: data.getWishListsByUser
    })
  }

  render() {
    return (
      <Fragment>
        <h3>Your Wish Lists</h3>
        {this.state.wishLists.map(wl => (
          <div key={wl.id} onClick={() => {
            this.props.history.push(`/wish-list/${wl.id}`)
          }}>
            <p>Name: {wl.name}</p>
            <p>{wl.priv ? 'Private' : 'Public'}</p>
          </div>
        ))}
        <button onClick={() => {
          this.props.history.push('/create-wishlist');
        }}>
          Create WishList
        </button>
      </Fragment>
    )
  }
}

export default withContext(WishListsList);