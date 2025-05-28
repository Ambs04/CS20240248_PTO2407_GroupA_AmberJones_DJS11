import "./podcast.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Podcast({ onPlay }) {
  const { id } = useParams();

  const [podcast, setPodcast] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [openSeason, setOpenSeason] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("https://podcast-api.netlify.app/");
        const data = await res.json();

        const selectedId = data.find((podcast) => podcast.id === id);
        setPodcast(selectedId);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load show. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
      id: podcast.id,
      image: season.image,
      episodeTitle: episode.title,
      episodeDesc: episode.description,
      season: season.season,
      showId: podcast.id,
      showTitle: podcast.title,
      timeStamp: Date.now(),
    };

    //get the existing favourites from localStorage and parse them to 'favourites'
    const favesList = JSON.parse(localStorage.getItem("favourites"));
    //then take the data received and parse it into the localStorage as strings
    const updateFavesList = [...favesList, favourite];
    localStorage.setItem("favourites", JSON.stringify(updateFavesList));
  };

  const toggleSeason = (seasonId) => {
    setOpenSeason((prevId) => (prevId === seasonId ? null : seasonId));
  };

  return (
    <>
      {/* <div className="container"> */}
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
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
          {seasons.map((season, seasonId) => (
            <div key={season.id}>
              <button onClick={() => toggleSeason(seasonId)}>
                {openSeason === seasonId ? "▼" : "►"}Season {season.season}
              </button>
              {openSeason === seasonId && (
                <div>
                  {season.episodes.map((episode) => (
                    <div key={episode.id} className="episodes">
                      <p>Episode{episode.episode}</p>
                      <h3>{episode.title}</h3>
                      <p>{episode.description}</p>
                      <button onClick={() => onPlay("/Dont_Go_Way_Nobody.mp3")}>
                        Play Epidsode
                      </button>
                      <button
                        onClick={() => handleFaves(episode, podcast, season)}
                      >
                        Add to Favourites
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
