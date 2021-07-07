import "./index.css";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  UPDATE_BAR_MUTATION,
  CREATE_TABLE_MUTATION,
} from "../../graphQl/mutations";
import { AUTH_TOKEN } from "../../constants";

export default function EditBar(props) {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const bar = props.bar[0];
  const [error, setError] = useState("");
  const [formState, setFormState] = useState({
    id: parseInt(bar.id),
    name: bar.name,
    location: bar.location,
    desc: bar.desc,
    imageUrl: bar.imageUrl,
    numberOfTables: bar.numberOfTables,
    userId: bar.userId,
  });
  const [tableState, setTableState] = useState({ number: "", seats: "" });
  //console.log(bar);
  //define update mutation
  const [editBar] = useMutation(UPDATE_BAR_MUTATION, {
    variables: {
      id: parseInt(formState.id),
      name: formState.name,
      location: formState.location,
      desc: formState.desc,
      imageUrl: formState.imageUrl,
      numberOfTables: parseInt(formState.numberOfTables),
      userId: parseInt(formState.userId),
    },
    onError: (error) => {
      setError(error.message);
      //console.log({ error });
    },
    onCompleted: ({ createBar }) => {
      window.location.href = "/barManagement";
    },
  });
  const [createTable] = useMutation(CREATE_TABLE_MUTATION, {
    headers: {
      authorization: `${authToken}`,
    },
    variables: {
      number: parseInt(tableState.number),
      seats: parseInt(tableState.seats),
      occupiedBy: 0,
      isFree: true,
      barId: parseInt(bar.id),
    },
    onError: (error) => {
      setError(error.message);
      //console.log({ error });
    },
    onCompleted: ({ createBar }) => {
      setTableState({ number: "", seats: "" });
    },
  });
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  //console.log(tableState);
  return (
    <div>
      <h1 className="editDetails-title">Edit your Bar Details</h1>
      <div>
        <form onSubmit={handleSubmit} className="editDetails-form">
          {/* bar name */}
          <label>Name Of bar</label>
          <input
            className="editDetails-inputs"
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }
            type="text"
            placeholder="Your bar name"
          />
          {/* bar location */}
          <label>Bar Address</label>
          <input
            className="editDetails-inputs"
            value={formState.location}
            onChange={(e) =>
              setFormState({
                ...formState,
                location: e.target.value,
              })
            }
            type="text"
            placeholder="Your bar address"
          />
          {/* bar description */}
          <label>Description of Bar</label>
          <textarea
            className="editDetails-inputs"
            value={formState.desc}
            onChange={(e) =>
              setFormState({
                ...formState,
                desc: e.target.value,
              })
            }
            type="text"
            placeholder="A short description of your bar to attract users!"
            rows="10"
            cols="50"
          />
          {/* bar image */}
          <label>Photo of your Bar</label>
          <input
            className="editDetails-inputs"
            value={formState.imageUrl}
            onChange={(e) =>
              setFormState({
                ...formState,
                imageUrl: e.target.value,
              })
            }
            type="text"
            placeholder="bar photo url link"
          />
          {/* number of tables */}
          <label>How many tables your bar has</label>
          <input
            className="editDetails-inputs"
            value={formState.numberOfTables}
            onChange={(e) =>
              setFormState({
                ...formState,
                numberOfTables: e.target.value,
              })
            }
            type="number"
            placeholder="number of tables"
          />
          <button className="editDetails-button" onClick={editBar}>
            Submit!
          </button>
          {error && <h3>{error}</h3>}
        </form>
        <h1 className="editDetails-title">Add a New Table</h1>
        <form onSubmit={handleSubmit} className="editDetails-form">
          {/* table number */}
          <label>Table Number</label>
          <input
            className="editDetails-inputs"
            value={tableState.number}
            onChange={(e) =>
              setTableState({
                ...tableState,
                number: Number(e.target.value),
              })
            }
            type="number"
            placeholder="table number"
          />
          {/* number of seats */}
          <label>Number of Seats</label>
          <input
            className="editDetails-inputs"
            value={tableState.seats}
            onChange={(e) =>
              setTableState({
                ...tableState,
                seats: Number(e.target.value),
              })
            }
            type="number"
            placeholder="how many seats"
          />
          {/* submit create table */}
          <button className="editDetails-button" onClick={createTable}>
            Submit!
          </button>
          {error && <h3>{error}</h3>}
        </form>
      </div>
    </div>
  );
}
