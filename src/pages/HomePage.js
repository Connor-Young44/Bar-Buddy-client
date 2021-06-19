import React from "react";

import { useQuery } from "@apollo/client";

//import query
import { GET_ALL_BARS } from "../graphQl/queries";
import BarInfo from "../components/BarInfo";

export default function HomePage() {
  //query for all bars

  const { loading, error, data } = useQuery(GET_ALL_BARS);

  //deal with loading data
  if (loading) return "loading...";
  //deal with errors
  if (error) return <p>Error! {error.message}</p>;

  //console.log(data.bars);
  const res = data.bars;

  return (
    <div>
      <div>
        <h1>Welcome to Bar Buddy!</h1>
      </div>
      <div>
        {res.map((bar) => (
          <BarInfo
            key={bar.id}
            name={bar.name}
            desc={bar.desc}
            image={bar.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
