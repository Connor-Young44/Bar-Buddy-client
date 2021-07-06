import { useMutation, useQuery } from "@apollo/client";
import "./index.css";
import React, { useState } from "react";
import { AUTH_TOKEN } from "../../constants";
import { PLACE_ORDER } from "../../graphQl/mutations";
import { GET_MENU_ITEMS } from "../../graphQl/queries";

export default function OrderForm(props) {
  const [itemId, setItemId] = useState({
    id: 0,
    name: "",
  });
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const authToken = localStorage.getItem(AUTH_TOKEN);
  //get all menu items for order choice
  const menuItems = useQuery(GET_MENU_ITEMS, {
    headers: {
      authorization: `${authToken}`,
    },
    variables: {
      barId: Number(props.barId),
    },
  });
  //order mutation

  const [placeOrder] = useMutation(PLACE_ORDER, {
    headers: {
      authorization: `${authToken}`,
    },
    variables: {
      served: false,
      closed: false,
      qty: Number(amount),
      userId: Number(props.userId),
      tableId: Number(props.tableId),
      menuItemId: Number(itemId.id),
    },
    onError: (error) => {
      setError(error.message);
      //console.log({ error });
    },
    onCompleted: ({ createBar }) => {
      setAmount(0);
      alert("order Placed!", itemId.name);
    },
  });

  if (menuItems.loading) return <p>Loading.....</p>;
  if (menuItems.error) return <p> {menuItems.error.message}</p>;
  //console.log(menuItems);
  return (
    <div className="orderForm-body">
      <h2 className="orderForm-subtitle">Place Your Order!</h2>
      {error && <p>{error}</p>}
      {itemId.name !== "" && (
        <div>
          <h3>
            {amount} {itemId.name}
          </h3>
          <button className="cardButton" onClick={placeOrder}>
            place Your Order
          </button>
        </div>
      )}
      <div className="itemDeck">
        {menuItems.data.menuItems.map((item) => (
          <div className="itemCard" key={item.id}>
            <img
              style={{ maxWidth: "200px" }}
              src={item.imageUrl}
              alt="menu item"
            />
            <p style={{ color: "aliceblue", fontSize: "1.5rem" }}>
              {item.name}
            </p>
            <p>{item.desc}</p>
            <p style={{ color: "aliceblue" }}>€ {item.price}</p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              className="cardButton"
              onClick={() => {
                setItemId({ id: item.id, name: item.name });
              }}
            >
              add to order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
