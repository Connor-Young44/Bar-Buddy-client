import "./App.css";
import { Switch, Route } from "react-router-dom";
import { AUTH_TOKEN } from "./constants";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import BarDetails from "./pages/BarDetails";
import BarUser from "./pages/BarUser";
//import query

import Logout from "./pages/LogOut";

function App() {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  if (!authToken) return <Login />;
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/barManagement" component={BarDetails} />
        <Route path="/barUser" component={BarUser} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
