//import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Components/Layout";
import Podcast from "./Pages/Podcast";
import Player from "./Components/Player";
import { useState, useEffect } from "react";
import Favourites from "./Pages/Favourites";
//import SortBy from "./Components/SortBy";

function App() {
  const [audio] = useState(
    "https://podcast-api.netlify.app/placeholder-audio.mp3"
  );
  const [playKey, setPlayKey] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [sortingOrder, setSortingOrder] = useState("A-Z");
  const [genreFilter, setGenreFilter] = useState([]);

  const play = () => {
    setIsActive(false);
    setPlayKey((prev) => prev + 1);
    setIsActive(true);
  };

  useEffect(() => {
    const handle = (event) => {
      if (isActive) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handle);

    return () => window.removeEventListener("beforeunload", handle);
  }, [isActive]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Home
                  sortingOrder={sortingOrder}
                  genreFilter={genreFilter}
                  setSortingOrder={setSortingOrder}
                  setGenreFilter={setGenreFilter}
                />
              }
            />
            <Route path="podcast/:id" element={<Podcast onPlay={play} />} />
            <Route path="favourites" element={<Favourites />} />
            {/* <Route index element={<FavouritesHome/>}/>
           <Route path="favourites/podcast/:id" element={<FavouritesPodcast/>}/> */}
            {/* </Route> */}
          </Route>
        </Routes>
        {isActive && <Player key={playKey} src={audio} />}
      </BrowserRouter>
    </>
    //<SortBy />
  );
}

export default App;
