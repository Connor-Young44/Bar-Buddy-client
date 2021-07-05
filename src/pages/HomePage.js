import React from "react";
import "./HomePage.css";
import { useQuery } from "@apollo/client";

//import query
import { GET_ALL_BARS, GET_CURRENT_USER } from "../graphQl/queries";
import BarInfo from "../components/BarInfo";
import { AUTH_TOKEN } from "../constants";

export default function HomePage() {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const { loading, error, data } = useQuery(GET_ALL_BARS);
  const userData = useQuery(GET_CURRENT_USER, {
    headers: {
      authorization: `${authToken}`,
    },
    //fetchPolicy: "network-only",
  });
  if (userData.loading) return "loading..";

  if (userData.error) return <p> {userData.error.message};</p>;

  //console.log("me data", userData.data.me);
  //query for all bars

  //deal with loading data
  if (loading) return "loading...";
  //deal with errors
  if (error) return <p>Error! {error.message}</p>;

  //console.log(data.bars);
  const res = data.bars;

  return (
    <div>
      <div>
        <h1 className="homePage-title">Welcome to Bar Buddy!</h1>
      </div>
      <div>
        {res.map((bar) => (
          <BarInfo
            key={bar.id}
            id={bar.id}
            name={bar.name}
            desc={bar.desc}
            image={bar.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
