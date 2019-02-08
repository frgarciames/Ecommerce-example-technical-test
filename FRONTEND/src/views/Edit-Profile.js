import React, { Component } from 'react';
import { withContext } from '../utils/withContext';
import { graphqlRequestWithToken } from '../services/graphql.service.';
import { getQueryEditProfile } from '../helpers/query-constructors';
import '../styles/views/_edit-profile.scss';
import { InputText } from '../components/input-text';

class EditProfile extends Component {

  state = {
    user: {
      email: '',
      age: 0
    }
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
          value: input.value
        });
      }
    })
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
      <div className='edit-profile__container'>
        {user && (
          <form onSubmit={this.handleOnSubmit} className='edit-profile__form'>
            <div className='edit-profile__info__item'>
              <label htmlFor='email'>
                Email
              </label>
              <InputText
                name='email'
                id='email'
                defaultValue={user.email}
              />
            </div>
            <div className='edit-profile__info__item'>
              <label htmlFor='age'>
                Age
              </label>
              <InputText
                name='age'
                id='age'
                defaultValue={user.age}
                type='number'
              />
            </div>
            <div className='edit-profile__buttons'>
              <button type='submit'> Save</button>
            </div>
          </form>
        )}
      </div>
    )
  }
}

export default withContext(EditProfile)