import { useQuery } from "@apollo/client";
import React from "react";
import "./index.css";

import { NavLink } from "react-router-dom";
import { AUTH_TOKEN } from "../../constants";

import { GET_CURRENT_USER } from "../../graphQl/queries";
import LogoutButton from "../../pages/LogOut";
import LeaveBarButton from "./LeaveBarButton";

const NavBar = (props) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

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
  const currentBar = userData.data.me.currentBar;
  const id = userData.data.me.id;
  return (
    <div className="navbar-main">
      <div className="navbar-body">
        <NavLink className="navbar-link" to="/">
          Home
        </NavLink>

        {isBuisness && (
          <NavLink className="navbar-link" to="/barManagement">
            Bar Management
          </NavLink>
        )}
        {currentBar !== 0 && <LeaveBarButton id={id} />}
        {authToken ? (
          <>
            <h3 className="navbar-text">
              welcome {userData.data.me.firstName}
            </h3>
            <LogoutButton />
          </>
        ) : (
          <NavLink className="navbar-link" to="/login">
            login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default NavBar;
