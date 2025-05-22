import Home from "../Pages/Home";
//import Podcast from "../Pages/Podcast";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <Home /> */}
      {/* <Podcast /> */}
      <Footer />
    </>
  );
}
