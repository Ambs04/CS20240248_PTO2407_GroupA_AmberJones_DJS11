import { useState, useEffect } from "react";

export default function Favourites() {
  //set state for favourites
  const [favourites, setFavourites] = useState([]);

  //set state to the favourites list that is fetched from localStorage
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("favourites"));
    setFavourites(storage);
  }, []);

  const removeFave = (id) => {
    //filter over favourites and find the id, if the item id is equal to the id that must be removed, it will be removed else it will keep the item
    const remove = favourites.filter((fave) => fave.id !== id);
    //update the local storage
    localStorage.setItem("favourites", JSON.stringify(remove));
    //update favourites state
    setFavourites(remove);
  };

  //   const filterFavourites = favourites
  //     .filter((fave) => {
  //       if (!genreFilter) return fave.genres && fave.genres.includes(genreFilter);
  //     })
  //     .sort((a, b) =>
  //       sortingOrder === "A-Z"
  //         ? a.episodeTitle.localeCompare(b.episodeTitle)
  //         : b.episodeTitle.localeCompare(a.episodeTitle)
  //     );

  return (
    //if there are no favourites, display p tag otherwise display the favourites episode
    <div>
      <h2>Favourites:</h2>
      {favourites.length === 0 ? (
        <p>You have no favourites yet.</p>
      ) : (
        favourites.map((faves) => (
          <div key={faves.id}>
            <h2>{faves.showTitle}</h2>
            <img src={faves.image} />
            <h3>{faves.episodeTitle}</h3>
            <p>Season {faves.season}</p>
            <p>{faves.episodeDesc}</p>
            <p>Added: {new Date(faves.timeStamp).toLocaleString()}</p>
            <button onClick={() => removeFave(faves.id)}>
              Remove from favourites
            </button>
          </div>
        ))
      )}
    </div>
  );
}
