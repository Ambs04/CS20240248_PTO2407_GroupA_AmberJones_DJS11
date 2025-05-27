import { useState, useEffect } from "react";

export default function Favourites() {
  //set state for favourites
  const [favourites, setFavourites] = useState([]);

  //set state to the favourites list that is fetched from localStorage
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("favourites"));
    setFavourites(storage);
  }, []);

  return <h1>favourites</h1>;
}
