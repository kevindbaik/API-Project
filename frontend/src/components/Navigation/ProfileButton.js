import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

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

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const divShow = "profile-dropdown" + (showMenu ? "" : " hidden");
  const divUser = "profile-dropdown" + (user ? "-loggedin" : "-loggedout");

  return (
    <div className="user-profile-button-container">
      <button className="user-profile-button" onClick={openMenu}>
        <i className="fa-solid fa-bars" />
        <i className="fas fa-user-circle" />
      </button>
      <div id={divUser} className={divShow} ref={ulRef}>
        {user ? (
          <div className="logged-in-dropdown">
            <p className="loggedin-text">
              Hello, <strong>{user.firstName}!
              </strong>
            </p>
            <p className="loggedin-text emailtext"> {user.email}</p>
            <div className="loggedin-line"></div>
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                onClick={closeMenu}
                to="/spots/current"
              >
            <div className="loggedin-link">
                <p className="houselogo">⌂</p> Manage Spots
            </div>
              </NavLink>
            <div className="loggedin-line"></div>
            <button className="logout-button" onClick={logout}>
              Log Out
            </button>
          </div>
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
