import * as React from "react";
import { LocationContext } from "../../LocationContext";

const SecondPage: React.FC = () => {
  const contextData = React.useContext<ILocationContext>(LocationContext);

  return (
    <div className="page">
      <div>
        <h4>city: {contextData.location.city}</h4>
        <h4>counry: {contextData.location.country}</h4>
      </div>
    </div>
  );
};

export default SecondPage;
