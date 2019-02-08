import React, { Component, Fragment } from 'react';
import { withContext } from '../utils/withContext';
import { graphqlRequestWithToken } from '../services/graphql.service.';
import { getQueryEditWishList, getQueryGetWishListById } from '../helpers/query-constructors';
import { InputText } from '../components/input-text';
import { InputCheckbox } from '../components/input-checkbox';
import '../styles/views/_edit-wishlist.scss';

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
    const containers = e.target.children;
    const inputs = [];
    Array.from(containers).map(container => {
      const input = Array.from(container.children).find(el => el.nodeName === "INPUT");
      if (input) {
        inputs.push({
          name: input.name,
          value: input.type === 'checkbox' ? input.checked : input.value
        });
      }
    })
    const name = inputs.find(el => el.name === 'name').value;
    const priv = inputs.find(el => el.name === 'priv').value;
    const data = await graphqlRequestWithToken({
      query: getQueryEditWishList({ name, priv, id: this.state.wishList.id })
    });
    this.props.history.push(`/wish-list/${this.state.wishList.id}`)
  }

  render() {
    const { wishList } = this.state;
    return (
      <Fragment>
        {wishList && (
          <form onSubmit={this.handleOnSubmit} className='edit-wishlist__form'>
            <div className='edit-wishlist__input-text'>
              <label htmlFor='name'>
                Name
              </label>
              <InputText
                name='name'
                id='name'
                defaultValue={wishList.name}
              />
            </div>
            <div className='edit-wishlist__input-checkbox'>
              <InputCheckbox
                name='priv'
                id='priv'
                defaultChecked={wishList.priv}
                labelText='Private'
              />
            </div>
            <div className='edit-wishlist__button'>
              <button type='submit'>
                Save
            </button>
            </div>
          </form>
        )}
      </Fragment>
    )
  }
}

export default withContext(EditWishList)