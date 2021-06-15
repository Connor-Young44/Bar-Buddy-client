import "./App.css";
import { Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
