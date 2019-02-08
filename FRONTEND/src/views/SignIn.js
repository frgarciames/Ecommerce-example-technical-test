import React, { Component } from 'react';
import { withContext } from '../utils/withContext';
import { graphqlRequestWithNoToken } from '../services/graphql.service.';
import { getQuerySignin } from '../helpers/query-constructors';
import '../styles/views/_signin.scss';
import { InputText } from '../components/input-text';

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
    this.props.history.push('/settings')
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className='signin__container'>
        <form onSubmit={this.handleOnSignIn} className='signin__form' autoComplete='off'>
          <div className='signin__info__item'>
            <label htmlFor='email'>
              <span className='signin__bold'>Email: </span>
            </label>
            <InputText
              name='email'
              id='email'
              onChange={this.handleChange}
            />
          </div>
          <div className='signin__info__item'>
            <label htmlFor='age'>
              <span className='signin__bold'>Age: </span>
            </label>
            <InputText
              name='age'
              id='age'
              type='number'
              onChange={this.handleChange}
            />
          </div>
          <div className='signin__info__item'>
            <label htmlFor='password'>
              <span className='signin__bold'>Password: </span>
            </label>
            <InputText
              name='password'
              id='password'
              type='password'
              onChange={this.handleChange}
            />
          </div>
          <div className='signin__info__item'>
            <label htmlFor='repeat-password'>
              <span className='signin__bold'>Repeat password: </span>
            </label>
            <InputText
              name='rpPassword'
              id='repeat-password'
              type='password'
              onChange={this.handleChange}
            />
          </div>
          <div className='signin__buttons'>
            <button type='submit'>Save</button>
          </div>
        </form>
      </div>
    )
  }
}

export default withContext(SignIn);