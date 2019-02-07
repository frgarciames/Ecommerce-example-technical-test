import React, { Component, Fragment } from 'react';
import { withContext } from '../utils/withContext';
import { graphqlRequestWithToken } from '../services/graphql.service.';
import { getQueryCreateWishList } from '../helpers/query-constructors';

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
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleOnSubmit}>
          <label htmlFor='name'>
            Name
        </label>
          <input type='text' name='name' id='name' value={this.state.name} onChange={this.handleOnChange} />
          <label htmlFor='priv'>
            Private
        </label>
          <input type='checkbox' name='priv' id='priv' value={this.state.priv} onChange={this.handleOnChangeCheckBox} />
          <button type='submit'>Create</button>
        </form>
      </Fragment>
    )
  }
}

export default withContext(CreateWishList);