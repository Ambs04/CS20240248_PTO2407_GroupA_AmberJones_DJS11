import "./footer.css";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <div className="footer-container">
        <div className="footer-info">
          <p className="footer-text">© PodStar {year}</p>
        </div>
      </div>
    </>
  );
}
