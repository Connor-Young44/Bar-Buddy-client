import { useQuery } from "@apollo/client";
import React from "react";
import { GET_TABLES } from "../../graphQl/queries";

export default function GoLive(props) {
  const ID = parseInt(props.bar[0].id);
  const { loading, error, data } = useQuery(GET_TABLES, {
    variables: { barId: ID },
  });

  //deal with loading data
  if (loading) return "loading...";
  //deal with errors
  if (error) return <p>Error! {error.message}</p>;

  //console.log(data.bars);
  const res = data.tables;
  const newRes = [...res];
  const sortedTables = newRes.sort((a, b) => {
    return parseInt(a.number) - parseInt(b.number);
  });

  //console.log(res);
  return (
    <div>
      <h1>live Bar updates!</h1>
      <div>
        <h3>live orders</h3>
        {sortedTables.map((table) => (
          <div key={table.id}>
            <h3>{table.number} </h3>
            <h4>{table.isFree}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
