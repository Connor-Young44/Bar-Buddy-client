import "../OrderForm/index.css";
import "./index.css";
import Spinner from "../Spinner";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { AUTH_TOKEN } from "../../constants";
import { CREATE_ITEM_MUTATION } from "../../graphQl/mutations";
import { GET_MENU_ITEMS } from "../../graphQl/queries";

export default function EditMenu(props) {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const [Error, setError] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    isFood: false,
    imageUrl: "",
    desc: "",
    price: "",
    barId: parseInt(props.bar[0].id),
  });
  //console.log(props.bar);
  const [createItem] = useMutation(CREATE_ITEM_MUTATION, {
    variables: {
      name: formState.name,
      isFood: formState.isFood,
      imageUrl: formState.imageUrl,
      desc: formState.desc,
      price: parseInt(formState.price),
      barId: formState.barId,
    },
    onError: (error) => {
      setError(error.message);
      //console.log({ error });
    },
    onCompleted: ({ createBar }) => {
      window.location.href = "/barManagement";
    },
  });
  // handle button submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
  };
  //get menu item
  const { loading, error, data } = useQuery(GET_MENU_ITEMS, {
    headers: {
      authorization: `${authToken}`,
    },
    variables: {
      barId: Number(props.bar[0].id),
    },
  });

  //deal with loading data
  if (loading) return <Spinner />;
  //deal with errors
  if (error) return <p>Error! {error.message}</p>;

  //console.log(data.bars);
  const res = data.menuItems;
  //console.log(res);
  return (
    <div>
      <h1 className="editMenu-title">Manage your menu</h1>
      <div className="itemDeck">
        {" "}
        {res.map(
          (item) =>
            item.barId === formState.barId && (
              <div className="itemCard" key={item.id}>
                <h3 className="orderForm-subtitle">
                  {item.name}: € {item.price}
                </h3>
                <img
                  style={{ maxWidth: "200px", height: "150px" }}
                  src={item.imageUrl}
                  alt="item img should be here"
                />
                <p>{item.desc}</p>
              </div>
            )
        )}{" "}
      </div>
      <div>
        <form className="editMenu-form" onSubmit={handleSubmit}>
          <h3 className="editMenu-form-title">Add New Menu Item!</h3>
          {/* item name */}
          <label>Name Of New Menu Item</label>
          <input
            className="editMenu-inputs"
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }
            type="text"
            placeholder="Your menu item name"
          />
          {/* is Food */}
          <label>is this food?</label>
          <input
            className="editMenu-inputs"
            value={formState.location}
            onChange={(e) =>
              setFormState({
                ...formState,
                isFood: !formState.isFood,
              })
            }
            type="checkbox"
            placeholder="Your bar address"
          />
          {/* item description */}
          <label>Description of Menu Item</label>
          <textarea
            className="editMenu-inputs"
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
          {/* item image */}
          <label>URL link of your menu item</label>
          <input
            className="editMenu-inputs"
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
          {/* price */}
          <label>How Much Does It Cost?</label>
          <input
            className="editMenu-inputs"
            value={formState.price}
            onChange={(e) =>
              setFormState({
                ...formState,
                price: e.target.value,
              })
            }
            type="number"
            placeholder="price in euros"
          />
          <button className="editMenu-button" onClick={createItem}>
            Submit!
          </button>
          {error && <h3>{Error}</h3>}
        </form>
      </div>
    </div>
  );
}
