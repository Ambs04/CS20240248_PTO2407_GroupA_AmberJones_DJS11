import "./header.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  const styleActive = {
    fontWeight: "bold",
    texDecoration: "underline",
    color: "#f0cccf",
  };

  return (
    <>
      <div className="header">
        <div className="logo-container">
          <NavLink to="/">
            <span>
              <img src="logo.png" className="logo" />
            </span>
          </NavLink>
          <span>
            <h2 className="website-name">PodStar</h2>
          </span>
        </div>
        <div className="page-links">
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? styleActive : null)}
          >
            <span>
              <h3 className="home-heading">Home</h3>
            </span>
          </NavLink>
          <NavLink
            to="favourites"
            style={({ isActive }) => (isActive ? styleActive : null)}
          >
            <h3 className="favourite-heading">Favourites</h3>
          </NavLink>
        </div>
      </div>
    </>
  );
}
