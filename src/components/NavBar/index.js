import React from "react";

import { NavLink } from "react-router-dom";
import { AUTH_TOKEN } from "../../constants";

const NavBar = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div>
      <div>
        <NavLink to="/">home</NavLink>

        {authToken ? (
          <button
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              window.location.href = "/";
            }}
          >
            logout
          </button>
        ) : (
          <NavLink to="/login">login</NavLink>
        )}
      </div>
    </div>
  );
};

export default NavBar;
