import React, { Fragment } from 'react';

export const InputCheckbox = ({ onChange, placeholder, name, id, value, labelText, defaultValue, defaultChecked }) => (
  <Fragment>
    <input
      type="checkbox"
      onChange={onChange}
      id={id}
      placeholder={placeholder}
      name={name}
      value={value}
      defaultChecked={defaultChecked}
    />
    <label
      htmlFor={id}
      className='label-checkbox'
    >
      {labelText}
    </label>
  </Fragment>
)