import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_BAR_MUTATION } from "../../graphQl/mutations";

export default function NewBarForm(props) {
  const [error, setError] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    location: "",
    desc: "",
    imageUrl: "",
    numberOfTables: 0,
    userId: parseInt(props.userId),
  });
  //console.log(parseInt(formState.userId));
  //create bar mutation
  const [createBar] = useMutation(CREATE_BAR_MUTATION, {
    variables: {
      name: formState.name,
      location: formState.location,
      desc: formState.desc,
      imageUrl: formState.imageUrl,
      numberOfTables: parseInt(formState.numberOfTables),
      userId: formState.userId,
    },
    onError: (error) => {
      setError(error.message);
      //console.log({ error });
    },
    onCompleted: ({ createBar }) => {
      formState.isBuisness
        ? (window.location.href = "/barDetails")
        : (window.location.href = "/");
    },
  });
  // handle button submit
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <h1>welcome to Bar Buddy!</h1>
      <h3>please add your bar details to start using the app!</h3>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 25%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* bar name */}
        <label>Name Of bar</label>
        <input
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
        <button onClick={createBar}>Submit!</button>
        {error && <h3>{error}</h3>}
      </form>
    </div>
  );
}
