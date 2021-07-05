import { useApolloClient } from "@apollo/client";
import { useState } from "react";
import "./index.css";

import { GET_ALL_BARS, GET_CURRENT_USER } from "../../graphQl/queries";
import EditBar from "../EditBar";
import EditMenu from "../EditMenu";
import GoLive from "../GoLive";

export default function ManageBar() {
  const [option, setOption] = useState("");
  const client = useApolloClient();
  const user = client.cache.readQuery({
    query: GET_CURRENT_USER,
  });
  const bars = client.cache.readQuery({
    query: GET_ALL_BARS,
  });

  //get the users bar
  const thisBar = bars.bars.filter(
    (bar) => parseInt(bar.userId) === parseInt(user.me.id)
  );

  //console.log(thisBar[0]);
  return (
    <div>
      <h1 style={{ color: "aliceblue" }}>Welcome To Bar Buddy!</h1>
      <h3>this is the Management window for: {thisBar[0].name}</h3>
      <button
        className="manageBar-button"
        onClick={() => setOption("editMenu")}
      >
        Edit Your Menu
      </button>
      <button className="manageBar-button" onClick={() => setOption("editBar")}>
        Edit Your Details
      </button>
      <button className="manageBar-button" onClick={() => setOption("goLive")}>
        GO LIVE!
      </button>
      <div>
        {option === "editMenu" && <EditMenu bar={thisBar} />}
        {option === "editBar" && <EditBar bar={thisBar} />}
        {option === "goLive" && <GoLive bar={thisBar} />}
      </div>
    </div>
  );
}
