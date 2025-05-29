import { useState, useEffect } from "react";
import "./sortby.css";

export default function SortBy({ setSortingOrder, setGenreFilter }) {
  //set state for unique genres
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

        //create new set that will hold all the unique genres
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

  //event handlers for genre filters and sort
  const handleGenre = (event) => {
    const selected = event.target.value;
    //if 'All geres' are selected then the filters reset
    if (selected === "") {
      setGenreFilter([]);
      //else the selected genre filter will be applied
    } else {
      setGenreFilter([selected]);
    }
  };

  const handleSort = (event) => {
    //selected sort order will be applied
    setSortingOrder(event.target.value);
  };

  return (
    <>
      <div className="sort-containers">
        <div className="genre-group">
          <select onChange={handleGenre}>
            {/* map over the genre state and produce a button for each genre type */}
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-group">
          <select onChange={handleSort}>
            <option value="A-Z">Sort A to Z</option>
            <option value="Z-A"> Sort Z to A</option>
          </select>
        </div>
      </div>
    </>
  );
}
