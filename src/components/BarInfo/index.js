import React from "react";

export default function BarInfo(props) {
  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.desc}</p>
      <img src={props.image} alt="bar" />
    </div>
  );
}
