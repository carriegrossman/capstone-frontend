import React from "react";
import logo from "../images/brewsy1.png";

import {
    Link,
  } from "react-router-dom";

export default function Nav({currentUser, setCurrentUser}) {

    const logOut = () => {
        setCurrentUser(undefined);
      };
      
  return <div>
      <nav className="navbar">
        <div className="navbar-start">
          <img src={logo} alt="brewsy logo" className="logo" />
        </div>

        <div className="navbar-end">
          {!currentUser && (
            <React.Fragment>
              <Link className="navbar-item" to="/login">
                Login
              </Link>
              <Link className="navbar-item" to="/register">
                Register
              </Link>
              <Link className="navbar-item" to="/about">
                About
              </Link>
            </React.Fragment>
          )}

          {currentUser && (
            <React.Fragment>
              <Link className="navbar-item" to="/about">
                About
              </Link>
              <Link className="navbar-item" to="/search">
                Search
              </Link>
              {currentUser && !currentUser.owner && (
              <Link className="navbar-item" to="/myvisits">
                My Visits and Rewards
              </Link>
              )}
            </React.Fragment>
          )}

          {currentUser && currentUser.owner && (
            <React.Fragment>
              <Link className="navbar-item" to="/mycoffeeshops">
                My Coffee Shops
              </Link>
            </React.Fragment>
          )}

          {currentUser && (
            <React.Fragment>
              <Link className="button" onClick={logOut}>
                Log Out
              </Link>
            </React.Fragment>
          )}
        </div>
      </nav>
  </div>;
}
