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

  return (
    <>
      <div>
        {/* map through the favourites to display favourites' item's info */}
        {favourites.map((faves) => (
          <div key={faves.id}>
            <h2>{faves.showTitle}</h2>
            <img src={faves.image} />
            <h3>{faves.episodeTitle}</h3>
            <p>Season {faves.season}</p>
            <p>{faves.episodeDesc}</p>
            <button onClick={() => removeFave(faves.id)}>
              Remove from favourites
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
