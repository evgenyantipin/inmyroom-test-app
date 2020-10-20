import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLocation } from "./store/location";
import Autocomplete from "./components/Autocomplete";
import Menu from "./components/Menu";
import About from "./components/About";
import http from "./api/http";

interface IGeodata {
  geodata: {
    ip: string;
    data: IGeodataData;
  };
}

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

const Main: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchData = async () => {
      const result: IGeodata = await http<IGeodata>("/api/v1/geocode");
      if (result.geodata.data.city && result.geodata.data.country) {
        dispatch(
          setLocation({
            country: result.geodata.data.country,
            city: result.geodata.data.city,
          })
        );
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <Menu />
      <Autocomplete />
      <Switch>
        <Route exact path="/about" component={About} />
      </Switch>
    </div>
  );
};

export default Main;
