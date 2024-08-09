// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import SignIn from "./pages/SignIn";

import AgricultureEcommerce from "./pages/mainPage";

import SignUp from "./pages/SignUp";
import CompanyProfile from "./pages/CompanyProfile";

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
			</Routes>
		</Router>
	</React.StrictMode>
);
