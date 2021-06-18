import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter as Router } from "react-router-dom";
//import apollo and graphql
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  //useQuery,
  //gql,
} from "@apollo/client";
import { AUTH_TOKEN } from "./constants";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphQl",
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem(AUTH_TOKEN),
    "client-name": "WidgetX Ecom [web]",
    "client-version": "1.0.0",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
