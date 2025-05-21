import "./header.css";

export default function Header() {
  return (
    <>
      <div className="header">
        <div className="logo-container">
          <img src="logo.png" className="logo" />
          <h2 className="website-name">PodStar</h2>
        </div>
        <div className="search-container">
          <input type="text" placeholder="search" className="search-bar" />
        </div>
        {/* <span className="mode-toggle">
                    <div className="top"></div>
                    <div className="middle"></div>
                    <div className="bottom"></div>
                </span> */}
      </div>
    </>
  );
}
