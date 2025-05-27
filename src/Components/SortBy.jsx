import { useState, useEffect } from "react";

export default function SortBy({ setSortingOrder, setGenreFilter }) {
  // //set state
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    //fetch data from main API first
    fetch("https://podcast-api.netlify.app/")
      .then((res) => res.json())
      //make data promise an async function
      .then(async (data) => {
        //the data (containing all shows) will be mapped through as promises which will then be mapped over the id-specific array for the shows (to fetch the genres)
        const showGenres = await Promise.all(
          data.map((show) =>
            fetch(`https://podcast-api.netlify.app/id/${show.id}`).then((res) =>
              res.json()
            )
          )
        );

        //create new set that will hold all the genres
        const genresSet = new Set();
        //iterate over the showGenres array of promises to return the genres from each show
        showGenres.forEach((show) => {
          //collects unique genres and adds them to the genres Set
          if (show.genres) {
            show.genres.forEach((genre) => genresSet.add(genre));
          }
        });

        //add genresSet to state as an array
        setGenres(Array.from(genresSet));
      });
  }, []);

  return (
    <>
      <div>
        {/* map over the genre state and produce a button for each genre type */}
        {genres.map((genre) => (
          <button key={genre} onClick={() => setGenreFilter(genre)}>
            {genre}
          </button>
        ))}
      </div>
      <div>
        <button onClick={() => setSortingOrder("A-Z")}>Sort A to Z</button>
        <button onClick={() => setSortingOrder("Z-A")}> Sort Z to A</button>
      </div>
    </>
  );
}
