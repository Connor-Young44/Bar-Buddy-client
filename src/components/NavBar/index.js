import { useApolloClient } from "@apollo/client";
import React from "react";

import { NavLink } from "react-router-dom";
import { AUTH_TOKEN } from "../../constants";
import { GET_CURRENT_USER } from "../../graphQl/queries";
import LogoutButton from "../../pages/LogOut";

const NavBar = (props) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  //const userData = new InMemoryCache({"user"})
  const client = useApolloClient();

  const user = client.cache.readQuery({
    query: GET_CURRENT_USER,
  });
  //console.log(user.me.isBuisness);
  const isBuisness = user.me.isBuisness;
  return (
    <div>
      <div>
        <NavLink to="/">home</NavLink>
        {isBuisness && <NavLink to="/barManagement">Bar Management</NavLink>}
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
