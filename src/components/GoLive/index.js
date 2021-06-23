import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { AUTH_TOKEN } from "../../constants";
import { EDIT_TABLE } from "../../graphQl/mutations";
import {
  GET_LIVE_USERS,
  GET_ORDERS,
  GET_TABLES,
  GET_USERS,
} from "../../graphQl/queries";

export default function GoLive(props) {
  const [Table, setTable] = useState({
    id: 0,
    occupiedBy: 0,
    clicked: false,
  });

  const authToken = localStorage.getItem(AUTH_TOKEN);
  const ID = parseInt(props.bar[0].id);
  const orders = useQuery(GET_ORDERS, {
    pollInterval: 20000,
  });
  const { loading, error, data, subscribeToMore } = useQuery(GET_USERS, {
    pollInterval: 10000,
    variables: { barId: ID },
  });
  useEffect(() => {
    orders.subscribeToMore({
      document: GET_ORDERS,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const newOrder = subscriptionData.data.orderPlaced;
        //console.log(newOrder);
        if (newOrder)
          return {
            orders: [...prev.orders, newOrder],
          };
      },
    });
  }, [orders, subscribeToMore]);

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

  const Tables = useQuery(GET_TABLES, {
    variables: { barId: ID },
    pollInterval: 20000,
  });

  //mutation define for changing table number
  const [editTable] = useMutation(EDIT_TABLE, {
    headers: {
      authorization: `${authToken}`,
    },
    variables: {
      id: parseInt(Table.id),
      occupiedBy: parseInt(Table.occupiedBy),
    },

    onError: (error) => {
      <p>{error.message}</p>;
      //console.log({ error });
    },
    onCompleted: ({ editTable }) => {
      setTable({ ...Table, clicked: false });
      alert("user cleared, please wait to update");
    },
  });
  console.log(Table);
  //deal with loading data
  if (Tables.loading || loading || orders.loading) return <p>"loading...";</p>;
  if (Tables.error || error || orders.error)
    return <p>Error! {orders.error}</p>;

  //table data
  const res = Tables.data.tables;
  const newRes = [...res];
  const sortedTables = newRes.sort((a, b) => {
    return parseInt(a.number) - parseInt(b.number);
  });

  return (
    <div>
      <h1>live Bar updates!</h1>
      <div>
        <h5>Users in Bar</h5>
        {data.users.length === 0 && <p>No users is Bar</p>}
        {data.users.map((user) => (
          <div key={user.id}>
            <p>
              User no. {user.id}: {user.firstName}
              {user.lastName}
            </p>
          </div>
        ))}
        <h3>live orders</h3>
        {orders.data.orders.length > 0 &&
          orders.data.orders.map((order) => (
            <div key={order.id}>
              <p>
                {order.qty} {order.menuItems[0].name} Table Number:{" "}
                {order.tableId}
              </p>
            </div>
          ))}

        <h3>Table manager</h3>
        {sortedTables.map((table) => (
          <div key={table.id}>
            <h3>Table: {table.number} </h3>

            {table.occupiedBy !== 0 ? (
              <div>
                <p>Occupied by user number: {table.occupiedBy}</p>
                <button
                  onClick={() =>
                    setTable({
                      ...Table,
                      id: parseInt(table.id),
                      occupiedBy: 0,
                      clicked: true,
                    })
                  }
                >
                  clear Table
                </button>
                {Table.clicked && (
                  <button onClick={editTable}>Confirm changes</button>
                )}
              </div>
            ) : (
              <>
                <p>Table Is Free</p>
                <select
                  onChange={(e) =>
                    setTable({
                      ...Table,
                      id: parseInt(table.id),
                      occupiedBy: parseInt(e.target.value),
                      clicked: true,
                    })
                  }
                >
                  <option value={0}>Available users</option>
                  {data.users.map((user) => (
                    <option key={user.id} value={parseInt(user.id)}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))}
                </select>
                {Table.clicked && (
                  <button onClick={editTable}>Confirm changes</button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
