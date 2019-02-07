import React, { Component, Fragment } from 'react';
import { withContext } from '../utils/withContext';
import { deleteCookie } from '../helpers/cookie';
import { graphqlRequestWithNoToken, graphqlRequestWithToken } from '../services/graphql.service.';
import { getQueryLogin, getQueryChangePassword } from '../helpers/query-constructors';

class Settings extends Component {

  state = {
    errorOnLogin: false,
    email: '',
    password: '',
    changingPassword: false
  }

  handleOnLogin = async (e) => {
    e.preventDefault();
    const { email, password } = this.state
    const data = await graphqlRequestWithNoToken({
      query: getQueryLogin({ email, password })
    });
    if (!data.logIn) {
      this.setState({
        errorOnLogin: true
      })
    } else {
      document.cookie = `token=${data.logIn}`;
      this.props.context.setUserInApp();
    }
  }

  handleOnChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleOnRedirect = (redirect) => {
    this.props.history.push(redirect);
  }

  handleOnChangePwd = async (e) => {
    e.preventDefault();
    const inputs = Array.from(e.target.children).filter(el => el.nodeName !== "BUTTON");
    const oldPassword = inputs.find(el => el.name === 'old-password').value;
    const newPassword = inputs.find(el => el.name === 'new-password').value;
    const repeatNewPassword = inputs.find(el => el.name === 'repeat-new-password').value;
    if ((oldPassword && newPassword && repeatNewPassword) &&
      (newPassword === repeatNewPassword)) {
      const data = await graphqlRequestWithToken({
        query: getQueryChangePassword({ newPassword, oldPassword })
      });
      if (data.changePassword) {
        this.setState({
          successChangePassword: true,
          errorChangePassword: false,
          changingPassword: false
        })
      } else {
        this.setState({
          successChangePassword: false,
          errorChangePassword: true,
          changingPassword: false
        })
      }
    }
  }

  render() {
    const { user } = this.props.context.state;
    return (
      <Fragment>
        {user ? (
          <Fragment>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
            <p>Id: {user.id}</p>
            <button onClick={() => this.handleOnRedirect('/edit-profile')}>Edit profile</button>
            {!this.state.changingPassword && (
              <button onClick={() => {
                this.setState({
                  changingPassword: true
                })
              }}>Change password</button>
            )}
            {this.state.changingPassword && (
              <Fragment>
                <form onSubmit={this.handleOnChangePwd}>
                  Your password <input type='password' name='old-password' autoComplete="off" />
                  New password <input type='password' name='new-password' autoComplete="off" />
                  Repeat new password <input type='password' name='repeat-new-password' autoComplete="off" />
                  <button type="submit">Change password</button>
                </form>
              </Fragment>
            )}
          </Fragment>
        ) : (
            <Fragment>
              <form onSubmit={this.handleOnLogin}>
                <input type='email' name='email' onChange={this.handleOnChange} />
                <input type='password' name='password' onChange={this.handleOnChange} />
                <button type='submit'>
                  LogIn
                </button>
              </form>
              <p>You don't have an account ?
                <span onClick={() => this.handleOnRedirect('/signin')}>Sign in !</span>
              </p>
            </Fragment>
          )}
        <Fragment>
          {this.state.successChangePassword && (
            <p>Password changed succesfully</p>
          )}
          {this.state.errorChangePassword && (
            <p>Error trying to change your password</p>
          )}
        </Fragment>
      </Fragment>
    )
  }
}

export default withContext(Settings);