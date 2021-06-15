import React from "react";
import { NavLink } from "react-router-dom";

export default function index() {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/">Log In</NavLink>
    </div>
  );
}
