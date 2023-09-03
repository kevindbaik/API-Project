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
      {isLoaded && (
          <div className='nav-rightside'>
              {sessionUser ? (
                <NavLink className="nav-newspotlink" to="/spots/new">
                  Create a New Spot +
                </NavLink>
              ) : null}
          <ProfileButton user={sessionUser} />
          </div>
      )}
    </div>
  );
}



export default Navigation;
