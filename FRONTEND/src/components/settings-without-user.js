import React from 'react';
import '../styles/components/_settings-without-user.scss';
import { InputText } from './input-text';

export const SettingsWithoutUser = ({ handleOnLogin, handleOnChange, handleOnRedirect }) => (
  <div className='without-user__container'>
    <form onSubmit={handleOnLogin} className='without-user__form'>
      <div className='without-user__info__item'>
        <label htmlFor='email'>
          Email
        </label>
        <InputText
          name='email'
          id='email'
          type='email'
          onChange={handleOnChange}
        />
      </div>
      <div className='without-user__info__item'>
        <label htmlFor='password'>
          Password
        </label>
        <InputText
          name='password'
          id='password'
          type='password'
          onChange={handleOnChange}
        />
      </div>
      <p className='without-user__buttons'>
        <button type='submit'>
          LogIn
        </button>
      </p>
    </form>
    <p className='without-user__question'>
      You don't have an account ?
    </p>
    <p>
      <button className='without-user__signin' onClick={() => handleOnRedirect('/signin')}>Sign in !</button>
    </p>
  </div>
)