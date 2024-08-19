import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  const location = useLocation();

  const hideHeader = ["/signin", "/signup"];
  const hideHeaderFooter = ["/companyprofile"];

  const shouldHideHeader = hideHeader.includes(location.pathname);
  const shouldHideFooter =
    hideHeaderFooter.includes(location.pathname) && !shouldHideHeader;

  return (
    <>
      {!shouldHideHeader && <Header />}
      <main>
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
    </>
  );
};

export default Layout;
