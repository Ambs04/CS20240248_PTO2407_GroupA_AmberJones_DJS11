//import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Components/Layout";
import Podcast from "./Pages/Podcast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="podcast/:id" element={<Podcast />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
