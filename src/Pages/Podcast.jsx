import "./podcast.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Podcast() {
  const { id } = useParams();

  const [podcast, setPodcast] = useState([]);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((res) => res.json())
      .then((data) => {
        const selectedId = data.find((podcast) => podcast.id === id);
        setPodcast(selectedId);
      });
  }, [id]);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSeasons(data.seasons);
      });
  }, [id]);

  return (
    <>
      {/* <div className="container"> */}
      <div className="pod-container">
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
          <img src="play-button-svgrepo-com.svg" />
        </div>
        <div className="show">
          {seasons.map((season) => (
            <>
              <div key={season.id} className="seasons">
                <h2>Season {season.season}:</h2>
              </div>
              {season.episodes.map((episode) => (
                <div key={episode.id} className="episodes">
                  <p>Episode{episode.episode}</p>
                  <h3>{episode.title}</h3>
                  <p>{episode.description}</p>
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
