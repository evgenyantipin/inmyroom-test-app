import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useDispatch, Provider } from "react-redux";
import Autocomplete from "./components/Autocomplete";
import SecondPage from "./components/SecondPage";
import { getGeodata } from "./api/geocode";
import { setLocation } from "./store/location";
import store from "./store";

interface IGeodataData {
  cache_hit: null;
  bogon?: boolean;
  city?: string;
  country?: string;
  ip: string;
  loc?: string;
  postal?: string;
  readme?: string;
  region: string;
  timezone: string;
}

interface IGeodata {
  geodata: {
    ip: string;
    data: IGeodataData;
  };
}

const App: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    getGeodata().then((result: IGeodata) => {
      if (result.geodata.data.city && result.geodata.data.country) {
        dispatch(
          setLocation({
            country: result.geodata.data.country,
            city: result.geodata.data.city,
          })
        );
      }
    });
  }, []);

  return (
    <div className="wrapper">
      <ul className="menu">
        <li>
          <Link className="menu__item" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="menu__item" to="/second-page">
            Second Page
          </Link>
        </li>
      </ul>
      <Autocomplete />
      <Switch>
        <Route exact path="/second-page" component={SecondPage} />
      </Switch>
    </div>
  );
};

const Home = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Router>
      <Route path="/" component={Home} />
    </Router>,
    document.body.appendChild(document.createElement("div"))
  );
});
