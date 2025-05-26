import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import SortBy from "./SortBy";

export default function Layout({ setSortingOrder }) {
  return (
    <>
      <Header />

      <SortBy setSortingOrder={setSortingOrder} />

      <Outlet />

      <Footer />
    </>
  );
}
