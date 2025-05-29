import "./podcast.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Podcast({ onPlay }) {
  //get pod Id from url params
  const { id } = useParams();

  //set podcast state (basic info) storage
  const [podcast, setPodcast] = useState([]);
  //set seasons state (episode and season data) storage
  const [seasons, setSeasons] = useState([]);
  //set selectSeason state storage
  const [selectedSeason, setSelectedSeason] = useState([]);
  //set loading state
  const [isLoading, setIsLoading] = useState(false);
  //set error state
  const [error, setError] = useState(null);
  //set open season state (what season is open)
  const [openSeason, setOpenSeason] = useState(null);

  //fetch data from API each time the id changes
  useEffect(() => {
    const fetchData = async () => {
      //loading is active
      setIsLoading(true);
      //error state inactive
      setError(null);
      try {
        const res = await fetch("https://podcast-api.netlify.app/");
        const data = await res.json();

        //if the selected id matches one of the podcast id's
        const selectedId = data.find((podcast) => podcast.id === id);

        setPodcast(selectedId);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        //error state active
        setError("Failed to load show. Please try again.");
      } finally {
        //loading inactive
        setIsLoading(false);
      }
    };
    //fetch async function
    fetchData();
  }, [id]);

  //fetch data each time id changes (full podcast data)
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
      id: episode.episode,
      image: season.image,
      episodeTitle: episode.title,
      episodeDesc: episode.description,
      season: season.season,
      showId: podcast.id,
      showTitle: podcast.title,
      timeStamp: Date.now(),
    };

    //get the existing favourites from localStorage and parse them to 'favourites'
    const favesList = JSON.parse(localStorage.getItem("favourites")) || [];
    //then take the data received and parse it into the localStorage as strings
    const updateFavesList = [...favesList, favourite];
    localStorage.setItem("favourites", JSON.stringify(updateFavesList));
  };

  //toggles visibility of a season (selected season)
  const toggleSeason = (seasonId) => {
    setOpenSeason((prevId) => (prevId === seasonId ? null : seasonId));
  };

  return (
    <>
      {isLoading && <p className="pod-loading">Loading...</p>}
      {error && <p className="pod-error">{error}</p>}
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
        </div>
        <div className="show">
          {seasons.map((season, seasonId) => (
            <div key={season.id}>
              <button
                className="season-btn"
                onClick={() => toggleSeason(seasonId)}
              >
                {openSeason === seasonId ? "▼ " : "► "}Season {season.season}
              </button>
              {/* if season id matched selected season, that season's info will be displayed */}
              {openSeason === seasonId && (
                <div>
                  {season.episodes.map((episode) => (
                    <div key={episode.id} className="episodes">
                      <h2>Episode {episode.episode}</h2>
                      <h3>{episode.title}</h3>
                      <p>{episode.description}</p>

                      <button
                        className="play-btn"
                        onClick={() =>
                          onPlay(
                            "https://podcast-api.netlify.app/placeholder-audio.mp3"
                          )
                        }
                      >
                        Play Episode
                      </button>
                      <button
                        className="fav-btn"
                        onClick={() => {
                          handleFaves(episode, podcast, season);
                          alert("Added to favourites!");
                        }}
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
    </>
  );
}
