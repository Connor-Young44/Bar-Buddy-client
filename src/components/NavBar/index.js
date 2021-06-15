import React from "react";
//import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { AUTH_TOKEN } from "../../constants";

const NavBar = () => {
  //const history = useHistory();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div>
      <div>
        <NavLink to="/">home</NavLink>

        {authToken ? (
          <button
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              //history.go(0)

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
