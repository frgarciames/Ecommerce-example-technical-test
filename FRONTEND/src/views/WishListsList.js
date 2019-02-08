import React, { Component } from 'react';
import { withContext } from '../utils/withContext';
import { graphqlRequestWithToken } from '../services/graphql.service.';
import { getQueryGetWishListsByUser } from '../helpers/query-constructors';
import { WishListItem } from '../components/wishlist-item';
import '../styles/views/_wishlists-list.scss';

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


  handleOnNavigation = (id) => {
    this.props.history.push(`/wish-list/${id}`)
  }

  handleOnNavigationCreate = () => {
    this.props.history.push('/create-wishlist');
  }

  render() {
    return (
      <div className='wishlist-list__container'>
        <span
          className='wishlist-list__add-icon'
          title='Create Wish List'
          onClick={this.handleOnNavigationCreate}
        >
          <i className="material-icons">
            add_circle_outline
          </i>
        </span>
        <div className='wishlist-list__wrapper-items'>
          {this.state.wishLists.map(wl => (
            <WishListItem
              key={wl.id}
              handleOnClick={() => this.handleOnNavigation(wl.id)}
              wishList={wl}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default withContext(WishListsList);