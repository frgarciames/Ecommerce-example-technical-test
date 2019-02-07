import React, { Component, Fragment } from 'react';
import { withContext } from '../utils/withContext';
import { graphqlRequestWithToken } from '../services/graphql.service.';
import { getQueryGetWishListsByUser, getQueryGetWishListById, getQueryDeleteProductToWishList } from '../helpers/query-constructors';
import { Loading } from '../components/loader';

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

  render() {
    const { wishList } = this.state
    return (
      <Fragment>
        {wishList ? (
          <Fragment>
            <p>Name: {wishList.name}</p>
            <p>Products: </p>
            {wishList.products.map(prod => (
              <Fragment key={prod.id}>
                <p>{prod.name}</p>
                <p>{prod.price}</p>
                <button onClick={async () => {
                  const data = await graphqlRequestWithToken({
                    query: getQueryDeleteProductToWishList({
                      id: prod.id
                    })
                  });
                  this.componentDidMount();
                }}>Remove product</button>
              </Fragment>
            ))}
            <button onClick={() => {
              this.props.history.push(`/edit-wish-list/${wishList.id}`)
            }}>Edit Wish List</button>
            <button>Copy url for share</button>
          </Fragment>
        ) : <Loading />}
      </Fragment>
    )
  }
}

export default withContext(WishLists);