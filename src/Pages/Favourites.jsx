import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./favourites.css";

export default function Favourites() {
  //set state for favourites storage
  const [favourites, setFavourites] = useState([]);

  //set state to sort favourites storage
  const [sort, setSort] = useState([]);

  //set loading state storage
  const [isLoading, setIsLoading] = useState(false);
  //set error state storage
  const [error, setError] = useState(null);

  //set state to the favourites list that is fetched from localStorage
  useEffect(() => {
    const fetchData = async () => {
      //loading state active
      setIsLoading(true);
      //error state inactive
      setError(null);
      //simulate delay
      setTimeout(() => {
        try {
          //fetch favourites list from local storage
          const storage = JSON.parse(localStorage.getItem("favourites"));
          //store favourites list in favourites state
          setFavourites(storage);
        } catch (err) {
          console.error("Failed to fetch data", err);
          //error state active
          setError("Failed to load favourites. Please try again.");
        } finally {
          //loading state inactive
          setIsLoading(false);
        }
      }, 2000);
    };

    //call async function
    fetchData();
  }, []);

  const removeFave = (episodeId) => {
    //filter over favourites and find the id, if the item id is equal to the id that must be removed, it will be removed else it will keep the item
    const remove = favourites.filter((fave) => fave.id !== episodeId);
    //update the local storage
    localStorage.setItem("favourites", JSON.stringify(remove));
    //update favourites state
    setFavourites(remove);
  };

  const sortFavourites = [...favourites].sort((a, b) => {
    if (sort === "A-Z") {
      return a.episodeTitle.localeCompare(b.episodeTitle);
    } else if (sort === "Z-A") {
      return b.episodeTitle.localeCompare(a.episodeTitle);
    } else if (sort === "Newest") {
      return b.timeStamp - a.timeStamp;
    } else if (sort === "Oldest") {
      return a.timeStamp - b.timeStamp;
    }
  });

  return (
    //if there are no favourites, display p tag otherwise display the favourites episode
    <div>
      <div className="btns">
        <button className="newest-btn" onClick={() => setSort("Newest")}>
          Newest to Oldest
        </button>
        <button className="oldest-btn" onClick={() => setSort("Oldest")}>
          Oldest to Newest
        </button>
        <button className="clear-btn" onClick={() => setSort("")}>
          Clear sort
        </button>
      </div>

      {isLoading && <p className="fav-loading">Loading...</p>}
      {error && <p className="fav-error">{error}</p>}

      <h2 className="heading">Favourites:</h2>
      {sortFavourites.length === 0 ? (
        <p className="fav-text">You have no favourites yet.</p>
      ) : (
        <div className="faves-container">
          {sortFavourites.map((faves) => (
            <div key={faves.episodeId} className="faves-card">
              <h2>{faves.showTitle}</h2>
              <img src={faves.image} className="fave-img" />
              <h3>{faves.episodeTitle}</h3>
              <p>Season {faves.season}</p>
              <p>Episode {faves.episodeId}</p>
              <p>{faves.episodeDesc}</p>
              <p>Added: {new Date(faves.timeStamp).toLocaleString()}</p>
              <Link to={`/podcast/${faves.showId}`}>
                <button>See show</button>
              </Link>
              <div className="button">
                <button
                  onClick={() => {
                    if (confirm("Remove from favourites?")) {
                      removeFave(faves.episodeId);
                    }
                  }}
                >
                  Remove from favourites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
