import React, { Component, Fragment } from 'react';
import { withContext } from '../utils/withContext';
import { graphqlRequestWithToken } from '../services/graphql.service.';
import { getQueryGetWishListById, getQueryDeleteProductToWishList } from '../helpers/query-constructors';
import { Loading } from '../components/loader';
import '../styles/views/_wishlist.scss';
import ProductCard from '../components/product-card';

class WishLists extends Component {

  state = {}

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await graphqlRequestWithToken({
      query: getQueryGetWishListById({
        id
      })
    });
    this.setState({
      wishList: data.getWishListById
    })
  }

  copyUrlToClipboard = () => {
    const tmpTextArea = document.createElement('textarea');
    const url = document.location.href;
    tmpTextArea.value = url
    document.body.appendChild(tmpTextArea);
    tmpTextArea.select();
    document.execCommand('copy')
    tmpTextArea.remove();
    alert(`Url copied: ${url}`)
  }

  render() {
    const { wishList } = this.state
    return (
      <div className='wishlist__container'>
        {wishList ? (
          <Fragment>
            <div className='wishlist__item'>
              <p className='wishlist__title'>{wishList.name}</p>
            </div>
            <div className='wishlist__products-list'>
              {wishList.products.map(prod => (
                <div key={prod.id} className='wishlist__product__item'>
                  <ProductCard
                    product={prod}
                    key={prod.id}
                    mode='wishlist'
                  />
                  <span onClick={async () => {
                    const data = await graphqlRequestWithToken({
                      query: getQueryDeleteProductToWishList({
                        id: prod.id
                      })
                    });
                    this.componentDidMount();
                  }}
                    title='Remove product'
                  >
                    <i className="material-icons">
                      remove_circle_outline
                    </i>
                  </span>
                </div>
              ))}
            </div>
            <div className='wishlist__buttons'>
              <span onClick={() => {
                this.props.history.push(`/edit-wish-list/${wishList.id}`)
              }}
                title='Edit Wishlist'>
                <i className="material-icons">
                  edit
                </i>
              </span>
              <span title='Share Wishlist' onClick={this.copyUrlToClipboard}>
                <i className="material-icons">
                  share
                </i>
              </span>
            </div>
          </Fragment>
        ) : <Loading />}
      </div>
    )
  }
}

export default withContext(WishLists);