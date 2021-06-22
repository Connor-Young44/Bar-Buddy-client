import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_LIVE_USERS, GET_TABLES, GET_USERS } from "../../graphQl/queries";

export default function GoLive(props) {
  const ID = parseInt(props.bar[0].id);

  const { loading, error, data, subscribeToMore } = useQuery(GET_USERS, {
    variables: { barId: ID },
    pollInterval: 10000,
  });
  useEffect(() => {
    subscribeToMore({
      document: GET_LIVE_USERS,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const newLiveUser = subscriptionData.data.userJoined;
        //console.log(newLiveUser);
        if (newLiveUser.currentBar === ID)
          return {
            users: [...prev.users, newLiveUser],
          };
      },
    });
  }, [subscribeToMore, ID]);

  //console.log(...result);
  const Tables = useQuery(GET_TABLES, {
    variables: { barId: ID },
  });
  //deal with loading data
  if (Tables.loading || loading) return <p>"loading...";</p>;
  //if (LiveUsers.loading) return "loaing";
  //deal with errors
  if (Tables.error || error) return <p>Error! {Tables.error.message}</p>;
  //table data
  const res = Tables.data.tables;
  const newRes = [...res];
  const sortedTables = newRes.sort((a, b) => {
    return parseInt(a.number) - parseInt(b.number);
  });
  //live users data
  //console.log(data);
  const findUser = (id) =>
    data.users.map((user) => {
      if (Number(user.id) === Number(id)) {
        return <p key={user.id}>Occupied by: {user.firstName}</p>;
      } else {
        return null;
      }
    });
  //console.log(findUser(1));
  return (
    <div>
      <h1>live Bar updates!</h1>
      <div>
        <h5>Users in Bar</h5>
        {data.users.length === 0 && <p>No users is Bar</p>}
        {data.users.map((user) => (
          <div key={user.id}>
            <p>{user.firstName}</p>
          </div>
        ))}
        <h3>live orders</h3>
        {sortedTables.map((table) => (
          <div key={table.id}>
            <h3>{table.number} </h3>
            <h4>{table.isFree}</h4>

            {table.occupiedBy !== 0 ? (
              findUser(Number(table.id))
            ) : (
              <>
                <p>Table Is Free</p>
                <select>
                  <option>Available users</option>
                  {data.users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
