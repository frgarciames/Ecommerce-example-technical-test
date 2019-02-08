import React, { Component, Fragment } from 'react';
import { withContext } from '../utils/withContext';
import { graphqlRequestWithToken } from '../services/graphql.service.';
import { getQueryCreateWishList } from '../helpers/query-constructors';
import { InputText } from '../components/input-text';
import { InputCheckbox } from '../components/input-checkbox';
import '../styles/views/_create-wishlist.scss';

class CreateWishList extends Component {
  state = {
    name: '',
    priv: false
  }

  handleOnChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleOnChangeCheckBox = (e) => {
    this.setState({
      priv: !this.state.priv
    })
  }

  handleOnSubmit = async (e) => {
    e.preventDefault();
    const { name, priv } = this.state;
    const data = await graphqlRequestWithToken({
      query: getQueryCreateWishList({ name, priv })
    });
    this.props.history.push('/wish-lists')
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleOnSubmit} className='create-wishlist__form'>
          <div className='create-wishlist__input-text'>
            <label htmlFor='name'>
              Name
            </label>
            <InputText
              name='name'
              id='name'
              value={this.state.name}
              onChange={this.handleOnChange}
            />
          </div>
          <div className='create-wishlist__input-checkbox'>
            <InputCheckbox
              name='priv'
              id='priv'
              value={this.state.priv}
              onChange={this.handleOnChangeCheckBox}
              labelText='Private'
            />
          </div>
          <div className='create-wishlist__button'>
            <button type='submit'>
              Create
            </button>
          </div>
        </form>
      </Fragment>
    )
  }
}

export default withContext(CreateWishList);