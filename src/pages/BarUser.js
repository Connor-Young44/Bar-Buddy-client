import { useQuery } from "@apollo/client";
import React from "react";
import OrderForm from "../components/OrderForm";
import { AUTH_TOKEN } from "../constants";

import { GET_ALL_BARS, GET_CURRENT_USER } from "../graphQl/queries";

export default function BarUser() {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const userData = useQuery(GET_CURRENT_USER, {
    headers: {
      authorization: `${authToken}`,
    },
  });

  //read bars from cache
  const allBars = useQuery(GET_ALL_BARS, {
    pollInterval: 20000,
  });

  //provide loading/error handlers
  if (userData.loading || allBars.loading) return "loading..";
  if (userData.error || allBars.error) return <p>ERROR;</p>;

  //get users current bar from user info
  const thisUser = userData.data.me;
  const barsArray = allBars.data.bars;
  const thisBar = barsArray.filter(
    (bar) => parseInt(bar.id) === parseInt(thisUser.currentBar)
  );
  //get bar tables
  const tables = thisBar[0].tables;
  //console.log(tables);
  //check if user id is in the table list
  const assignedTable = tables.filter(
    (table) => Number(table.occupiedBy) === Number(thisUser.id)
  );
  //console.log(assignedTable[0]);
  return (
    <div>
      <h1 style={{ color: "aliceblue" }}>welcome to {thisBar[0].name}</h1>

      <div>
        {assignedTable.length === 0 ? (
          <h3>Please Wait To Be Seated :) </h3>
        ) : (
          <h2>Table Number: {assignedTable[0].number}</h2>
        )}
        {assignedTable.length !== 0 && (
          <OrderForm
            barId={thisBar[0].id}
            userId={assignedTable[0].occupiedBy}
            tableId={assignedTable[0].id}
          />
        )}
      </div>
    </div>
  );
}
