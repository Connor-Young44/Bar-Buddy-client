//import React, { useState } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import Spinner from "../components/Spinner";
import NewBarForm from "../components/NewBarForm";
import ManageBar from "../components/ManageBar";
import { GET_ALL_BARS, GET_CURRENT_USER } from "../graphQl/queries";

export default function BarDetails() {
  const client = useApolloClient();

  const { loading, error, data } = useQuery(GET_ALL_BARS);

  //deal with loading data
  if (loading) return <Spinner />;
  //deal with errors
  if (error) return <p>Error! {error.message}</p>;

  const bars = data.bars;
  const user = client.cache.readQuery({
    query: GET_CURRENT_USER,
  });
  //check if user has a bar already
  const hasBar = bars.filter(
    (bar) => parseInt(bar.userId) === parseInt(user.me.id)
  );

  return (
    <div>
      {hasBar.length === 0 ? <NewBarForm userId={user.me.id} /> : <ManageBar />}
    </div>
  );
}
