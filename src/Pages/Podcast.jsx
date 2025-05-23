import "./podcast.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Podcast() {
  const { id } = useParams();

  const [podcast, setPodcast] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((res) => res.json())
      .then((data) => {
        const selectedId = data.find((podcast) => podcast.id === id);
        setPodcast(selectedId);
      });
  }, [id]);

  //const updatedDate = ;

  return (
    <>
      <div className="container">
        <div className="image-container">
          <img src={podcast.image} className="image" />
        </div>
        <div className="info">
          <h2 className="title">{podcast.title}</h2>
          <p className="description">{podcast.description}</p>

          {podcast.updated && (
            <p className="updated-date">
              Last updated:{" "}
              {new Date(podcast.updated).toLocaleDateString("en-ZA")}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
