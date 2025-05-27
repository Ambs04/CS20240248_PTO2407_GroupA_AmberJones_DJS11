import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
//import SortBy from "./SortBy";

export default function Layout({ children }) {
  return (
    <>
      <Header />

      {/* <SortBy
        setSortingOrder={setSortingOrder}
        setGenreFilter={setGenreFilter}
      /> */}

      <Outlet />

      <Footer />
    </>
  );
}
