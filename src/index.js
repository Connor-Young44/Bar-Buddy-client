import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter as Router } from "react-router-dom";
//import apollo and graphql
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";

import { AUTH_TOKEN } from "./constants";
import { getMainDefinition } from "@apollo/client/utilities";
import { split } from "apollo-link";

//link for mutation and quiris
const httpLink = new HttpLink({
  uri: "https://barbuddy.herokuapp.com/graphQl",
  headers: {
    authorization: localStorage.getItem(AUTH_TOKEN),
    "client-name": "WidgetX Ecom [web]",
    "client-version": "1.0.0",
  },
});
//web socket link
const wsLink = new WebSocketLink({
  uri: "ws://barbuddy.herokuapp.com/subscriptions",

  options: {
    reconnect: true,
    connectionParams: {
      authorization: localStorage.getItem(AUTH_TOKEN),
    },
  },
});

//link spliter
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
const client = new ApolloClient({
  link,
  cache: cache,
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
