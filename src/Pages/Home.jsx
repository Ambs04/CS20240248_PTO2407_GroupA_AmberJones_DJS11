import { useState, useEffect } from "react";
import "./home.css";
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  const [podState, setPodState] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((res) => res.json())
      .then((data) => {
        const sortData = data.sort((a, b) => a.title.localeCompare(b.title));
        setPodState(sortData);
      });
  }, []);

  return (
    <>
      <div className="pods">
        {podState.map((pods) => (
          <div key={pods.id} className="pod-card">
            <Link to={`/podcast/${pods.id}`}>
              <img src={pods.image} alt="podcast image" className="pod-img" />
            </Link>
            <div>
              <h3 className="pod-title">{pods.title}</h3>
              <p className="pod-desc">{pods.description.slice(0, 200)} ...</p>
              <p>Seasons Available: {pods.seasons}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
