import React from "react";
import ReactDOM from "react-dom";
import { Router, Switch, Route } from "react-router-dom";
import History from "./components/History";
import "./index.css";
import App from "./App";
import Create from "./components/Create";
import Update from "./components/Update";
import registerServiceWorker from "./registerServiceWorker";

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Router history={History}>
    <Switch>
      <Route exact path={"/"} component={App} />
      <Route path={"/create"} component={Create} />
      <Route path={"/update/:id"} component={Update} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
