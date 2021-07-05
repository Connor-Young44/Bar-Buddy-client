import { useApolloClient, useMutation } from "@apollo/client";
import "./index.css";
import React, { useState } from "react";
import { UPDATE_USER } from "../../graphQl/mutations";
import { GET_CURRENT_USER } from "../../graphQl/queries";

export default function BarInfo(props) {
  const [error, setError] = useState("");
  const client = useApolloClient();
  const user = client.cache.readQuery({
    query: GET_CURRENT_USER,
  });
  const [editUser] = useMutation(UPDATE_USER, {
    variables: {
      id: Number(user.me.id),

      currentBar: Number(props.id),
    },
    onError: (error) => {
      setError(error.message);
      //console.log({ error });
    },
    onCompleted: ({ createBar }) => {
      window.location.href = "/barUser";
    },
  });

  return (
    <div className="homePage-bar">
      <h3 className="homePage-bar-title">{props.name}</h3>
      <p className="homePage-bar-desc">{props.desc}</p>
      <img className="homePage-bar-img" src={props.image} alt="bar" />
      <button
        className="homePage-bar-button"
        value={props.id}
        onClick={editUser}
      >
        Enter this bar!
      </button>
      <p>{error}</p>
    </div>
  );
}
