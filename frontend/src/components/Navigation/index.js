import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/Seedbnb.svg'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  return (
    <div className='nav-container'>
      <NavLink exact to="/">
        <img className='seedbnb-logo' src={logo} alt=''/>
      </NavLink>
      {isLoaded && !sessionUser && (
          <ProfileButton user={sessionUser} />
      )}
      {isLoaded && sessionUser && (
        <div className='loggedin-nav-container'>
        <Link to='/spots/new'> Create a New Tree </Link>
        <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}



export default Navigation;
