import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Autocomplete from "./components/Autocomplete";
import SecondPage from "./components/SecondPage";

export const App = (): React.ReactElement => (
  <div className="wrapper">
    <ul className="menu">
      <li>
        <Link className="menu__item" to="/">Home</Link>
      </li>
      <li>
        <Link className="menu__item" to="/second-page">Second Page</Link>
      </li>
    </ul>
    <Autocomplete token="dba641882db97bef4fdc009cbd0e8d073a9db607" />
    <Switch>
      <Route exact path="/second-page" component={SecondPage} />
    </Switch>
  </div>
);

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Router>
      <Route path="/" component={App} />
    </Router>,
    document.body.appendChild(document.createElement("div"))
  );
});
