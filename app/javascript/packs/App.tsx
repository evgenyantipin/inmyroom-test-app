import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Autocomplete from "./components/Autocomplete";
import SecondPage from "./components/SecondPage";
import { getGeodata } from "./api/geocode";
import { LocationContext } from "./LocationContext";

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
  var [location, setLocation] = React.useState({
    country: "",
    city: "",
  });

  React.useEffect(() => {
    getGeodata().then((result: IGeodata) => {
      if (result.geodata.data.city && result.geodata.data.country) {
        setLocation({
          country: result.geodata.data.country,
          city: result.geodata.data.city,
        });
      }
    });
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
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
        <Autocomplete token={process.env.DADATA_TOKEN} />
        <Switch>
          <Route exact path="/second-page" component={SecondPage} />
        </Switch>
      </div>
    </LocationContext.Provider>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Router>
      <Route path="/" component={App} />
    </Router>,
    document.body.appendChild(document.createElement("div"))
  );
});
