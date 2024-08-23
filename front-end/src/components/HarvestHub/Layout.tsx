import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  const location = useLocation();
  const hideHeader = ["/signin", "/signup", "/sellerpage", "/buyerpage",];
  const shouldHideHeader = hideHeader.includes(location.pathname);
  return (
    <>
      {!shouldHideHeader && <Header />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Layout;