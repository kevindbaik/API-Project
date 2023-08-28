import React from 'react';
import { NavLink } from 'react-router-dom';
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
      {isLoaded && (
          <ProfileButton user={sessionUser} />
      )}
    </div>
  );
}



export default Navigation;
