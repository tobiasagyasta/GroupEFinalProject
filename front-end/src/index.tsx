// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import SignIn from "./pages/SignIn";

import AgricultureEcommerce from "./pages/mainPage";
import Dashboard from "./pages/SellerPage";
import BuyerPage from "./pages/BuyerPage";

import SignUp from "./pages/SignUp";
import CompanyProfile from "./pages/CompanyProfile";
import VegetableProductPage from "./pages/ProductPageVeg";
import FruitProductPage from "./pages/ProductPageFru";
import BundlingPackagePage from "./pages/ProductPageBun";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<AgricultureEcommerce />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/companyprofile" element={<CompanyProfile />} />
        <Route path="/productpage1" element={<VegetableProductPage />} />
        <Route path="/productpage2" element={<FruitProductPage />} />
        <Route path="/productpage3" element={<BundlingPackagePage />} />
        <Route path="/sellerpage" element={<Dashboard />} />
        <Route path="/buyerpage" element={<BuyerPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
