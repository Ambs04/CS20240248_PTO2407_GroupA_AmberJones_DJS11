import "./header.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  const styleActive = {
    fontWeight: "bold",
    texDecoration: "underline",
    color: "#ffffff",
  };

  return (
    <>
      <div className="header">
        <div className="logo-container">
          <NavLink to="/">
            <span>
              <img src="/podStar.png" className="logo" />
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
              <h2 className="home-heading">Home</h2>
            </span>
          </NavLink>
          <NavLink
            to="favourites"
            style={({ isActive }) => (isActive ? styleActive : null)}
          >
            <h2 className="favourite-heading">Favourites</h2>
          </NavLink>
        </div>
      </div>
    </>
  );
}
