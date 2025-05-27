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
        setSeasons(data.seasons);
        setSelectedSeason(data.seasons[0]);
      });
  }, [id]);

  //function to handle the favourites - takes episode, podcast and season as parameters
  const handleFaves = (episode, podcast, season) => {
    //create object which will retrieve the necessary info when episode is added to favourites, and store in localStorage
    const favourite = {
      id: episode.id,
      image: season.image,
      episodeTitle: episode.title,
      episodeDesc: episode.description,
      season: season.season,
      showId: podcast.id,
      showTitle: podcast.title,
    };

    //get the existing favourites from localStorage and parse them to 'favourites'
    const favesList = JSON.parse(localStorage.getItem("favourites"));
    //then take the data received and parse it into the localStorage as strings
    const updateFavesList = [...favesList, favourite];
    localStorage.setItem("favourites", JSON.stringify(updateFavesList));
  };

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
          <span>
            <img
              src="/play-button-svgrepo-com.svg"
              className="play-btn"
              onClick={() => {
                onPlay("/Dont_Go_Way_Nobody.mp3");
              }}
            />
          </span>
        </div>
        <div className="show">
          {seasons.map((season) => (
            <>
              <button
                key={season.id}
                className={selectedSeason?.id === season.id ? "active" : ""}
                onClick={() => setSelectedSeason(season)}
              >
                <div>Season {season.season}:</div>
              </button>
              {season.episodes.map((episode) => (
                <div key={episode.id} className="episodes">
                  <p>Episode{episode.episode}</p>
                  <h3>{episode.title}</h3>
                  <p>{episode.description}</p>
                  <button onClick={() => onPlay("/Dont_Go_Way_Nobody.mp3")}>
                    Play Epidsode
                  </button>
                  <button
                    onClick={() =>
                      handleFaves(episode, podcast, selectedSeason)
                    }
                  >
                    Add to Favourites
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
