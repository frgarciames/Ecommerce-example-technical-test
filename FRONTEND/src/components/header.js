import React from 'react';
import { Link } from 'react-router-dom';
import { withContext } from '../utils/withContext';
import { deleteCookie } from '../helpers/cookie';

const links = {
  'Home': '/',
  'My Wish Lists': '/wish-lists/',
};

const Header = (props) => {
  return (
    <header className='main-header'>
      <nav className='main-header__nav'>
        <ul className='main-header__menu'>
          <li className='main-header__menu__item'>
            <Link to='/'>Home</Link>
          </li>
          {props.context.state.user && (
            <li className='main-header__menu__item'>
              <Link to='/wish-lists'>My Wish Lists</Link>
            </li>
          )}
          <li className='main-header__menu__item main-header__menu__item__cart'>
            <Link to='/cart'>
              <i className="material-icons">
                shopping_cart
                </i>
              <span className="info-cart">{props.context.state.cart.length}</span>
            </Link>
          </li>
          <li className='main-header__menu__item main-header__menu__item__settings'>
            <Link to='/settings'>
              <i className="material-icons">
                settings
              </i>
            </Link>
          </li>
          {props.context.state.user && (
            <li
              className='main-header__menu__item main-header__menu__item__logout'
              onClick={() => {
                deleteCookie('token');
                props.context.setUser(null);
                window.location = '/'
              }}>
              <i className="material-icons">
                exit_to_app
              </i>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}


export default withContext(Header);