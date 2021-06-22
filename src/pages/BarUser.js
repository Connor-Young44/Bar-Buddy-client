import { useQuery } from "@apollo/client";
import React from "react";
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
  const allBars = useQuery(GET_ALL_BARS);
  //provide loading/error handlers
  if (userData.loading || allBars.loading) return "loading..";
  if (userData.error || allBars.error) return <p> {userData.error.message};</p>;

  //get users current bar from user info
  const barsArray = allBars.data.bars;
  const thisUser = userData.data.me;
  console.log(barsArray);
  console.log(thisUser);

  const thisBar = barsArray.filter(
    (bar) => parseInt(bar.id) === parseInt(thisUser.currentBar)
  );
  console.log("this bar", thisBar[0]);
  return (
    <div>
      <h1>welcome to {thisBar[0].name}</h1>
    </div>
  );
}
