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
  const [podState, setPodState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://podcast-api.netlify.app/");
      const data = await res.json();

      const filterData = await Promise.all(
        data.map((show) =>
          fetch(`https://podcast-api.netlify.app/id/${show.id}`).then((res) =>
            res.json()
          )
        )
      );

      const filter =
        genreFilter.length > 0
          ? data.filter((show) => {
              const details = filterData.find((d) => d.id === show.id);
              return (
                details &&
                details.genres &&
                details.genres.some((genre) => genreFilter.includes(genre))
              );
            })
          : data;

      const sortData = [...filter].sort((a, b) =>
        sortingOrder === "A-Z"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );

      setPodState(sortData);
    };
    fetchData();
  }, [sortingOrder, genreFilter]);

  return (
    <>
      <SortBy
        setSortingOrder={setSortingOrder}
        setGenreFilter={setGenreFilter}
      />
      <div className="pods">
        {podState.map((pods) => (
          <div key={pods.id} className="pod-card">
            <Link to={`/podcast/${pods.id}`}>
              <img src={pods.image} alt="podcast image" className="pod-img" />
            </Link>
            <div>
              <h3 className="pod-title">{pods.title}</h3>
              <p className="pod-desc">{pods.description.slice(0, 200)} ...</p>
              <p>Seasons Available: {pods.seasons}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
