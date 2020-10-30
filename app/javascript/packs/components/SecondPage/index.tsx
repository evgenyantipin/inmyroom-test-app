import * as React from "react";
import { useSelector } from "react-redux";
import { IState } from "../../store/location";

const SecondPage: React.FC = () => {
  const { location } = useSelector((state: IState) => state.location);

  return (
    <div className="page">
      <div>
        <h4>city: {location.city}</h4>
        <h4>counry: {location.country}</h4>
      </div>
    </div>
  );
};

export default SecondPage;
