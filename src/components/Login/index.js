import React, { useState } from "react";
import "./index.css";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../../graphQl/mutations";
import { AUTH_TOKEN } from "../../constants";
import { GET_CURRENT_USER } from "../../graphQl/queries";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  //login mutation call
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    awaitRefetchQueries: [{ query: GET_CURRENT_USER }],
    onCompleted: async ({ login }) => {
      localStorage.clear();

      localStorage.setItem(AUTH_TOKEN, login.token);
      history.go(0);
      //console.log(login.user.firstName);
    },
    onError: (error) => {
      console.log(error);
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
      window.location.href = "/";
    },
  });

  return (
    <div className="login-form">
      <h1 className="login-main-title">Welcome to Bar Buddy!</h1>
      <h4 className="login">{formState.login ? "Login" : "Sign Up"}</h4>
      <div>
        {!formState.login && (
          <div>
            <input
              className="login-inputs"
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
              className="login-inputs"
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
              className="login-inputs"
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
          className="login-inputs"
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
          className="login-inputs"
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Password"
        />
      </div>
      <div>
        <button
          className="login-button"
          onClick={formState.login ? login : signup}
        >
          {formState.login ? "login" : "create account"}
        </button>
        <button
          className="login-button"
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
