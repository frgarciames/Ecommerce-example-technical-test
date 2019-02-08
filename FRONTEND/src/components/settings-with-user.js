import React from 'react';
import '../styles/components/_settings-with-user.scss';
import { InputText } from './input-text';

export const SettingsWithUser = ({ user, handleOnChangePwd, changingPassword, handleOnRedirect, setChangingPassword }) => (
  <div className='with-user__container'>
    <p className='with-user__info__item'>
      <span className='with-user__bold'>Email: </span>
      {user.email}
    </p>
    <p className='with-user__info__item'>
      <span className='with-user__bold'>Age: </span>
      {user.age}
    </p>
    <p className='with-user__buttons'>
      <button onClick={() => handleOnRedirect('/edit-profile')}>Edit profile</button>
      {!changingPassword && (
        <button onClick={setChangingPassword}>Change password</button>
      )}
    </p>
    {changingPassword && (
      <div class='with-user__change-pwd'>
        <form onSubmit={handleOnChangePwd}>
          <div className='with-user__info__item'>
            <label htmlFor='old-pwd'>
              Your password
            </label>
            <InputText
              name='old-password'
              id='old-pwd'
              type='password'
            />
          </div>
          <div className='with-user__info__item'>
            <label htmlFor='new-pwd'>
              New password
            </label>
            <InputText
              name='new-password'
              id='new-pwd'
              type='password'
            />
          </div>
          <div className='with-user__info__item'>
            <label htmlFor='repeat-new-pwd'>
              Repeat new password
           </label>
            <InputText
              name='repeat-new-password'
              id='repeat-new-pwd'
              type='password'
            />
          </div>
          <p className='with-user__buttons'>
            <button type="submit">Change password</button>
          </p>
        </form>
      </div>
    )}
  </div>
)