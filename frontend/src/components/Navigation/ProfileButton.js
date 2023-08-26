import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const divClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="user-profile-button-container">
      <button className="user-profile-button" onClick={openMenu}>
        <i className="fa-solid fa-bars" />
        <i className="fas fa-user-circle" />
      </button>
      <div className={divClassName} ref={ulRef}>
        {user ? (
          <>
            <p>{user.username}</p>
            <p>{user.firstName} {user.lastName}</p>
            <p>{user.email}</p>
            <p>
              <button onClick={logout}>Log Out</button>
            </p>
          </>
        ) : (
          <div>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
