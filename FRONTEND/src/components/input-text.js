import React, { Fragment } from 'react';

export const InputText = ({ id, onChange, placeholder, name, className, value = undefined, defaultValue, type }) => (
  <Fragment>
    <input
      type={type ? type : 'text'}
      onChange={onChange ? onChange : undefined}
      className={`input-text ${className ? className : ''}`}
      placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      {...defaultValue ? defaultValue = { defaultValue } : ''}
    />
  </Fragment>
)