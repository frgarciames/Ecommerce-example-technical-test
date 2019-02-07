import React from 'react';
import '../styles/components/_searcher.scss';

export const Searcher = ({ handleOnChange }) => (
  <div className='searcher__container'>
    <div className='searcher__input'>
      <input type='checkbox' onChange={handleOnChange} id='small-app' name='from' value='small-app' />
      <label htmlFor='small-app' className='label-checkbox'>Small appliances</label>
      <input type='checkbox' onChange={handleOnChange} id='dishwashers' name='from' value='dishwashers' />
      <label htmlFor='dishwashers' className='label-checkbox'>Dishwashers</label>
    </div>
    <div className='searcher__input'>
      <span>Order by: </span>
      <span class='custom-select'>
        <select onChange={handleOnChange} name='orderBy'>
          <option selected></option>
          <option value='name'>Title</option>
          <option value='price'>Price</option>
        </select>
      </span>
    </div>
    <div className='searcher__input searcher__input__text'>
      <input type="text" onChange={handleOnChange} className='searcher__text' placeholder='Search' name='search' />
    </div>
  </div>
)