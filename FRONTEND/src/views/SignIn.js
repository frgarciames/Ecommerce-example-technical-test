import React, { Component, Fragment } from 'react';
import { withContext } from '../utils/withContext';
import { deleteCookie } from '../helpers/cookie';
import { graphqlRequestWithNoToken } from '../services/graphql.service.';
import { getQueryLogin, getQuerySignin } from '../helpers/query-constructors';

class SignIn extends Component {

  state = {
    errorOnSignIn: false,
    email: '',
    password: '',
    rpPassword: '',
    age: 0
  }

  handleOnSignIn = async (e) => {
    e.preventDefault();
    const { email, password, rpPassword, age } = this.state
    if (password !== rpPassword) {
      this.setState({
        errorOnSignIn: true
      })
      return
    }
    const data = await graphqlRequestWithNoToken({
      query: getQuerySignin({ email, password, age })
    });
    console.log(data)
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <Fragment>
        <Fragment>
          <form onSubmit={this.handleOnSignIn}>
            Email <input type='email' name='email' onChange={this.handleChange} />
            Pwd <input type='password' name='password' onChange={this.handleChange} />
            Repeat pwd <input type='password' name='rpPassword' onChange={this.handleChange} />
            Age <input type='number' name='age' onChange={this.handleChange} />
            <button type='submit'>
              LogIn
            </button>
          </form>
        </Fragment>
      </Fragment>
    )
  }
}

export default withContext(SignIn);