import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import SortBy from "./SortBy";

export default function Layout({ setSortingOrder, setGenreFilter }) {
  return (
    <>
      <Header />

      <SortBy
        setSortingOrder={setSortingOrder}
        setGenreFilter={setGenreFilter}
      />

      <Outlet />

      <Footer />
    </>
  );
}
