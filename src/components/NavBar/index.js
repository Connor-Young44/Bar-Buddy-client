import React from "react";

import { NavLink } from "react-router-dom";
import { AUTH_TOKEN } from "../../constants";
import LogoutButton from "../../pages/LogOut";

const NavBar = (props) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div>
      <div>
        <NavLink to="/">home</NavLink>

        {authToken ? (
          <>
            <h3 style={{ display: "inline-block" }}>
              welcome {props.firstName}
            </h3>
            <LogoutButton />
          </>
        ) : (
          <NavLink to="/login">login</NavLink>
        )}
      </div>
    </div>
  );
};

export default NavBar;
