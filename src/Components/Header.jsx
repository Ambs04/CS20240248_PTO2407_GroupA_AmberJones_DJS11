import "./header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="header">
        <div className="logo-container">
          <Link to="/">
            <img src="logo.png" className="logo" />
          </Link>
          <h2 className="website-name">PodStar</h2>
        </div>
        <div>
          <Link to="/">
            <h3>Home</h3>
          </Link>
          <Link to="favourites">
            <h3>Favourites</h3>
          </Link>
        </div>
      </div>
    </>
  );
}
