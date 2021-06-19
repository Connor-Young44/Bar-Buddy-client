import "./App.css";
import { Switch, Route } from "react-router-dom";
import { AUTH_TOKEN } from "./constants";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import BarDetails from "./pages/BarDetails";
//import query
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "./graphQl/queries";
import Logout from "./pages/LogOut";

function App() {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  //console.log(authToken);
  //console.log(authToken);
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    headers: {
      authorization: `${authToken}`,
    },
    fetchPolicy: "network-only",
  });
  if (loading) return "loading..";
  if (error) return error.message;

  //console.log("me data", data.me);

  return (
    <div className="App">
      <NavBar firstName={data.me.firstName} />
      <Switch>
        <Route path="/barManagement" component={BarDetails} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
