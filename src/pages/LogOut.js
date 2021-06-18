import React from "react";
import { ApolloConsumer } from "@apollo/client";

export default function LogoutButton() {
  return (
    <ApolloConsumer>
      {(client) => (
        <button
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
