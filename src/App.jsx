//import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Components/Layout";
import Podcast from "./Pages/Podcast";
import Player from "./Components/Player";
import { useState } from "react";

function App() {
  const [audio, setAudio] = useState("");
  const [isActive, setIsActive] = useState(false);

  const play = (src) => {
    setAudio(src);
    setIsActive(true);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="podcast/:id" element={<Podcast onPlay={play} />} />
          </Route>
        </Routes>
        {isActive && <Player src={audio} />}
      </BrowserRouter>
    </>
  );
}

export default App;
