// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import SignIn from "./pages/SignIn";
import { AccordionDemo } from "./pages/Accordion";
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/accordion" element={<AccordionDemo />} />
			</Routes>
		</Router>
	</React.StrictMode>
);
