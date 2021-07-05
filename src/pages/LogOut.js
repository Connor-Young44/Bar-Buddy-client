import React from "react";
import { ApolloConsumer } from "@apollo/client";
import "../components/NavBar/index.css";

export default function LogoutButton() {
  return (
    <ApolloConsumer>
      {(client) => (
        <button
          className="navbar-button"
          onClick={async () => {
            localStorage.clear();

            await client.resetStore();

            // client.cache.evict({ id: "ROOT_QUERY", fieldName: "me" });

            window.location.href = "/";
            //return new InMemoryCache();
          }}
        >
          Logout
        </button>
      )}
    </ApolloConsumer>
  );
}
