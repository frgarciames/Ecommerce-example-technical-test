import React, { Component, Fragment } from 'react';
import { withContext } from '../utils/withContext';
import { graphqlRequestWithNoToken, graphqlRequestWithToken } from '../services/graphql.service.';
import { getQueryLogin, getQueryChangePassword } from '../helpers/query-constructors';
import { SettingsWithUser } from '../components/settings-with-user';
import { SettingsWithoutUser } from '../components/settings-without-user';
import '../styles/views/_settings.scss';

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
      this.props.history.push('/');
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
    e.preventDefault();
    const containers = e.target.children;
    const inputs = [];
    Array.from(containers).map(container => {
      const input = Array.from(container.children).find(el => el.nodeName === "INPUT");
      if (input) {
        inputs.push({
          name: input.name,
          value: input.value
        });
      }
    })
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
          <div className='settings__with-user__container'>
            <SettingsWithUser
              user={user}
              handleOnChangePwd={this.handleOnChangePwd}
              changingPassword={this.state.changingPassword}
              handleOnRedirect={this.handleOnRedirect}
              setChangingPassword={() => {
                this.setState({
                  changingPassword: true
                })
              }}
            />
          </div>
        ) : (
            <div className='settings__without-user__container'>
              <SettingsWithoutUser
                handleOnLogin={this.handleOnLogin}
                handleOnChange={this.handleOnChange}
                handleOnRedirect={this.handleOnRedirect}
              />
            </div>
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