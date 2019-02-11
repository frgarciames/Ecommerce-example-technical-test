import React, { Component, Fragment } from 'react';
import { withContext } from '../utils/withContext';
import { graphqlRequestWithToken } from '../services/graphql.service.';
import { getQueryGetWishListsByUser, getQueryDeleteWishList } from '../helpers/query-constructors';
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

  deleteWishList = async (id) => {
    const data = await graphqlRequestWithToken({
      query: getQueryDeleteWishList({ id })
    });
    console.log(data)
    this.componentDidMount();
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
            <div className='wishlist-list__wishlist-item' key={wl.id}>
              <WishListItem
                handleOnClick={() => this.handleOnNavigation(wl.id)}
                wishList={wl}
              />
              <span className='wishlist-list__icon-remove' onClick={() => this.deleteWishList(wl.id)}>
                <i className="material-icons">
                  delete
                 </i>
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default withContext(WishListsList);