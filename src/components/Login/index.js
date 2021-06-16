import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../../graphQl/mutations";
import { AUTH_TOKEN } from "../../constants";

const Login = () => {
  //start state for apollo error
  const [error, setError] = useState("");
  //the state of the form saved as object
  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    isBuisness: false,
  });
  //login mutation call
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      window.location.href = "/";
    },
    onError: (error) => {
      //console.log(error.message);
      setError(error.message);
    },
  });
  //sign up mutation call
  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      firstName: formState.firstName,
      lastName: formState.lastName,
      email: formState.email,
      password: formState.password,
      isBuisness: formState.isBuisness,
    },
    onError: (error) => {
      setError(error.message);
      //console.log({ error });
    },
    onCompleted: ({ signup }) => {
      //localStorage.setItem(AUTH_TOKEN, signup.token);
      window.location.href = "/";
    },
  });

  return (
    <div>
      <h4 className="mv3">{formState.login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!formState.login && (
          <div>
            <input
              value={formState.firstName}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  firstName: e.target.value,
                })
              }
              type="text"
              placeholder="Your first name"
            />
            <input
              value={formState.lastName}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  lastName: e.target.value,
                })
              }
              type="text"
              placeholder="Your last name"
            />
            <label>are you a buisness?</label>
            <input
              type="checkbox"
              value={formState.isBuisness}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  isBuisness: !formState.isBuisness,
                })
              }
            />
          </div>
        )}

        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={formState.login ? login : signup}
        >
          {formState.login ? "login" : "create account"}
        </button>
        <button
          className="pointer button"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }
        >
          {formState.login
            ? "need to create an account?"
            : "already have an account?"}
        </button>
        {error && <h1>{error}</h1>}
      </div>
    </div>
  );
};

export default Login;
