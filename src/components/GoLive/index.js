import "./index.css";
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { AUTH_TOKEN } from "../../constants";
import { EDIT_ORDER, EDIT_TABLE } from "../../graphQl/mutations";
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
  const [order, setOrder] = useState({
    id: 0,
    served: false,
    closed: false,
    clicked: false,
  });

  const authToken = localStorage.getItem(AUTH_TOKEN);
  const ID = parseInt(props.bar[0].id);
  const orders = useQuery(GET_ORDERS, {
    pollInterval: 10000,
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
    pollInterval: 10000,
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
  //console.log(order);
  const [editOrder] = useMutation(EDIT_ORDER, {
    headers: {
      authorization: `${authToken}`,
    },
    variables: {
      id: parseInt(order.id),
      served: order.served,
      closed: order.served,
    },
    onError: (error) => {
      <p>{error.message}</p>;
    },
    onCompleted: ({ editOrder }) => {
      setOrder({ ...order, clicked: false });
    },
  });
  //console.log(Table);
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
  //console.log(order);
  return (
    <div className="goLive-body">
      <h1 className="goLive-title">live Bar updates!</h1>
      <div className="goLive-users">
        <h5 className="goLive-subtitle">Users in Bar</h5>
        {data.users.length === 0 && <p>No users is Bar</p>}
        {data.users.map((user) => (
          <div key={user.id}>
            <p style={{ color: "aliceblue" }}>
              User no. {user.id}: {user.firstName} {user.lastName}
            </p>
          </div>
        ))}
        <h3 className="goLive-subtitle">live orders</h3>
        {orders.data.orders.length > 0 &&
          orders.data.orders.map(
            (Order) =>
              !Order.served && (
                <div key={Order.id}>
                  <p style={{ color: "aliceblue" }}>
                    {Order.qty} {Order.menuItems[0].name} Table Number:{" "}
                    {Order.tableId}
                  </p>
                  <button
                    onClick={() =>
                      setOrder({
                        id: parseInt(Order.id),
                        served: true,
                        clicked: true,
                      })
                    }
                  >
                    click to serve order
                  </button>
                  {order.clicked && (
                    <button onClick={editOrder}>Confirm Served </button>
                  )}
                </div>
              )
          )}

        <h3 className="goLive-subtitle">Table manager</h3>
        {sortedTables.map((table) => (
          <div key={table.id}>
            <h3 style={{ color: "aliceblue" }}>Table: {table.number} </h3>

            {table.occupiedBy !== 0 ? (
              <div>
                <p style={{ color: "#1ba098" }}>
                  Occupied by user number: {table.occupiedBy}
                </p>
                <button
                  className="table-button"
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
                  <button className="table-button" onClick={editTable}>
                    Confirm changes
                  </button>
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
                  <button className="table-button" onClick={editTable}>
                    Confirm changes
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
