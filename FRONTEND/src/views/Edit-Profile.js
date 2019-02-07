import React, { Component, Fragment } from 'react';
import { withContext } from '../utils/withContext';
import { Loading } from '../components/loader';
import { graphqlRequestWithToken } from '../services/graphql.service.';
import { getQueryEditProfile } from '../helpers/query-constructors';

class EditProfile extends Component {

  state = {
    user: {
      email: '',
      age: 0
    }
  }

  handleOnSubmit = async (e) => {
    e.preventDefault();
    const inputs = Array.from(e.target.children).filter(el => el.nodeName !== "BUTTON");
    const email = inputs.find(el => el.name === 'email').value;
    const age = inputs.find(el => el.name === 'age').value;
    const data = await graphqlRequestWithToken({
      query: getQueryEditProfile({ email, age })
    });
    this.props.context.setUser(data.editClient)
  }

  render() {
    const { user } = this.props.context.state;
    return (
      <Fragment>
        {user && (
          <form onSubmit={this.handleOnSubmit}>
            Email <input type='email' name='email' defaultValue={user.email} />
            Age <input type='age' name='age' defaultValue={user.age} />
            <button type='submit'> Save</button>
          </form>
        )}
      </Fragment>
    )
  }
}

export default withContext(EditProfile)