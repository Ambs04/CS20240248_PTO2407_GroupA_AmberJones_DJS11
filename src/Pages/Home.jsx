import { useState, useEffect } from "react";
import "./home.css";
import SortBy from "../Components/SortBy";

import { Link } from "react-router-dom";

export default function Home({
  sortingOrder,
  genreFilter,
  setSortingOrder,
  setGenreFilter,
}) {
  //set podcast state storage
  const [podState, setPodState] = useState([]);
  //set loading state storage
  const [isLoading, setIsLoading] = useState(false);
  //set error state storage
  const [error, setError] = useState(null);

  //fetch data each time data is sorted or filtered through
  useEffect(() => {
    const fetchData = async () => {
      //loading state active
      setIsLoading(true);
      //error inactive
      setError(null);
      try {
        //fetch all podcasts
        const res = await fetch("https://podcast-api.netlify.app/");
        const data = await res.json();

        //fetch detailed data from id endpoint API and assign it to variable (all promise must first be fulfilled)
        const filterData = await Promise.all(
          data.map((show) =>
            fetch(`https://podcast-api.netlify.app/id/${show.id}`).then((res) =>
              res.json()
            )
          )
        );

        //filter through the fetched data, if filters are applied
        const filter =
          genreFilter.length > 0
            ? data.filter((show) => {
                //find shows ids that share genre filter
                const details = filterData.find((d) => d.id === show.id);
                return (
                  details &&
                  details.genres &&
                  details.genres.some((genre) => genreFilter.includes(genre))
                );
              })
            : data;

        //sort the filtered data in ascending or descending order
        const sortData = [...filter].sort((a, b) =>
          sortingOrder === "A-Z"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );

        //update podcast state with the sorted data
        setPodState(sortData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        //update error state if error is encountered
        setError("Failed to load podcasts. Please try again.");
      } finally {
        //loading is inactive
        setIsLoading(false);
      }
    };

    //call async function
    fetchData();
  }, [sortingOrder, genreFilter]);

  return (
    <>
      <SortBy
        setSortingOrder={setSortingOrder}
        setGenreFilter={setGenreFilter}
      />

      {isLoading && <p className="home-loading">Loading...</p>}
      {error && <p className="home-error">{error}</p>}

      <div className="pods">
        {podState.map((pods) => (
          <div key={pods.id} className="pod-card">
            <Link to={`/podcast/${pods.id}`}>
              <img src={pods.image} alt="podcast image" className="pod-img" />
            </Link>
            <div>
              <Link to={`/podcast/${pods.id}`}>
                <h3 className="pod-title">{pods.title}</h3>
              </Link>
              <p className="pod-desc">{pods.description.slice(0, 200)} ...</p>
              <p className="pod-season">
                <i>Seasons Available: {pods.seasons}</i>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
