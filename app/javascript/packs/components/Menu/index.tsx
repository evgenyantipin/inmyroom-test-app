import * as React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IState } from "../../store/location";

const Menu: React.FC = () => {
  const { location } = useSelector((state: IState) => state.location);

  return (
    <ul className="menu">
      {location.city && location.country && (
        <li className="menu__item">
          city: {location.city}
          <br />
          country: {location.country}
        </li>
      )}

      <li>
        <Link className="menu__item" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="menu__item" to="/about">
          About
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
