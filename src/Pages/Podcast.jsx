import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Podcast() {
  const { id } = useParams();

  const [podcast, setPodcast] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((res) => res.json())
      .then((data) => {
        const selectedId = data.find((podcast) => podcast.id === id);
        setPodcast(selectedId);
      });
  }, [id]);

  //const updatedDate = ;

  return (
    <>
      <div>
        <div>
          <img src={podcast.image} />
        </div>
        <h2>{podcast.title}</h2>
        <p>{podcast.description}</p>

        {podcast.updated && (
          <p>{new Date(podcast.updated).toLocaleDateString("en-ZA")}</p>
        )}
      </div>
    </>
  );
}
