import { useState, useEffect } from "react";

export default function Home() {
  const [podState, setPodState] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPodState(data);
      });
  }, []);

  return (
    <div>
      {podState.map((pods) => (
        <div key={pods.id}>
          <img src={pods.image} />
          <div>
            <h3>{pods.title}</h3>
            <p>{pods.description}</p>
          </div>
          <div>
            <span>{pods.genres}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
