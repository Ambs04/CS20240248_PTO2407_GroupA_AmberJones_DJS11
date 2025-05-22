export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <div className="footer-container">
        <div className="footer-info">
          <p>©PodStar {year}</p>
        </div>
      </div>
    </>
  );
}
