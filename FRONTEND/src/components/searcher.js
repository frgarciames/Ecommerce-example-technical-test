import React from 'react';
import '../styles/components/_searcher.scss';
import { InputText } from './input-text';
import { InputCheckbox } from './input-checkbox';

export const Searcher = ({ handleOnChange }) => (
  <div className='searcher__container'>
    <div className='searcher__input'>
      <InputCheckbox onChange={handleOnChange} id='small-app' name='from' value='small-app' labelText='small-app' />
      <InputCheckbox onChange={handleOnChange} id='dishwashers' name='from' value='dishwashers' labelText='dishwashers' />
    </div>
    <div className='searcher__input'>
      <span>Order by: </span>
      <span className='custom-select'>
        <select onChange={handleOnChange} name='orderBy' value={undefined}>
          <option value={undefined}></option>
          <option value='name'>Title</option>
          <option value='price'>Price</option>
        </select>
      </span>
    </div>
    <div className='searcher__input searcher__input__text'>
      <InputText
        type="text"
        onChange={handleOnChange}
        className='searcher__text'
        placeholder='Search'
        name='search' />
    </div>
  </div>
)