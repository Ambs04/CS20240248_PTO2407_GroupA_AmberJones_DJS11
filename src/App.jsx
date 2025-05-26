//import './App.css'
//import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home";
// import Layout from "./Components/Layout";
// import Podcast from "./Pages/Podcast";
// import Player from "./Components/Player";
import { useState } from "react";
import SortBy from "./Components/SortBy";

function App() {
  // const [audio] = useState("/Dont_Go_Way_Nobody.mp3");
  // const [playKey, setPlayKey] = useState(0);
  // const [isActive, setIsActive] = useState(false);

  // const play = () => {
  //   setIsActive(false);
  //   setPlayKey((prev) => prev + 1);
  //   setIsActive(true);
  // };

  return (
    // <>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<Layout />}>
    //         <Route index element={<Home />} />
    //         <Route path="podcast/:id" element={<Podcast onPlay={play} />} />
    //       </Route>
    //     </Routes>
    //     {isActive && <Player key={playKey} src={audio} />}
    //   </BrowserRouter>
    // </>
    <SortBy />
  );
}

export default App;
