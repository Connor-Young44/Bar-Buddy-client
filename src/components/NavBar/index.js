import { useQuery } from "@apollo/client";
import React from "react";

import { NavLink } from "react-router-dom";
import { AUTH_TOKEN } from "../../constants";
import { GET_CURRENT_USER } from "../../graphQl/queries";
import LogoutButton from "../../pages/LogOut";

const NavBar = (props) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  //const userData = new InMemoryCache({"user"})

  const userData = useQuery(GET_CURRENT_USER, {
    headers: {
      authorization: `${authToken}`,
    },
    //fetchPolicy: "cache-only",
  });
  if (userData.loading) return "loading";
  //console.log(userData.data.me);
  //console.log(user.me.isBuisness);

  const isBuisness = userData.data.me.isBuisness;
  return (
    <div>
      <div>
        <NavLink to="/">home</NavLink>

        {isBuisness && <NavLink to="/barManagement">Bar Management</NavLink>}

        {authToken ? (
          <>
            <h3 style={{ display: "inline-block" }}>
              welcome {userData.data.me.firstName}
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
