import React, { Component, Fragment } from 'react';
import { withContext } from '../utils/withContext';
import { Loading } from '../components/loader';
import { graphqlRequestWithToken } from '../services/graphql.service.';
import { getQueryEditWishList, getQueryGetWishListById } from '../helpers/query-constructors';

class EditWishList extends Component {

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

  handleOnSubmit = async (e) => {
    e.preventDefault();
    const inputs = Array.from(e.target.children).filter(el => el.nodeName !== "BUTTON");
    const name = inputs.find(el => el.name === 'name').value;
    const priv = inputs.find(el => el.name === 'priv').checked;
    console.log(priv)
    const data = await graphqlRequestWithToken({
      query: getQueryEditWishList({ name, priv, id: this.state.wishList.id })
    });
    console.log(data)
  }

  render() {
    const { wishList } = this.state;
    return (
      <Fragment>
        {wishList && (
          <form onSubmit={this.handleOnSubmit}>
            <input type='text' name='name' id='name' defaultValue={wishList.name} />
            <label htmlFor='name'>Name</label>
            <input type='checkbox' name='priv' id='priv' defaultChecked={wishList.priv} />
            <label className='label-checkbox' htmlFor='priv'>Private</label>
            <button type='submit'> Save</button>
          </form>
        )}
      </Fragment>
    )
  }
}

export default withContext(EditWishList)