import "./podcast.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Podcast({ onPlay }) {
  const { id } = useParams();

  const [podcast, setPodcast] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState([]);

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
        console.log(data.seasons);
        setSeasons(data.seasons);
        selectedSeason(data.seasons);
      });
  }, [id]);

  return (
    <>
      {/* <div className="container"> */}
      <div className="pod-container">
        <div className="image-container">
          <img src={selectedSeason?.image || podcast.image} className="image" />
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

          <img
            src="/play-button-svgrepo-com.svg"
            className="play-btn"
            onClick={() => {
              console.log("clicked");
              onPlay("/Dont_Go_Way_Nobody.mp3");
            }}
          />
        </div>
        <div className="show">
          {seasons.map((season) => (
            <>
              <button
                key={season.id}
                className={selectedSeason?.id === season.id ? "active" : ""}
                onClick={() => setSelectedSeason(season)}
              >
                <>Season {season.season}:</>
              </button>
              {season.episodes.map((episode) => (
                <div key={episode.id} className="episodes">
                  <p>Episode{episode.episode}</p>
                  <h3>{episode.title}</h3>
                  <p>{episode.description}</p>
                  <button onClick={() => onPlay("/Dont_Go_Way_Nobody.mp3")}>
                    Play Epidsode
                  </button>
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
