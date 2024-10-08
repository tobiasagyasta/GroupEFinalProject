// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";

import AgricultureEcommerce from "./pages/mainPage";
import Dashboard from "./pages/SellerPage";
import BuyerPage from "./pages/BuyerPage";

import SignUp from "./pages/SignUp";
import CompanyProfile from "./pages/CompanyProfile";

import BundlingPackagePage from "./pages/ProductPageBun";

import { Toaster } from "./components/ui/toaster";
import TransferInstructions from "./pages/TransferInstructions";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";

import ReviewDetailPage from "./pages/ReviewDetailPage";
import Layout from "./components/HarvestHub/Layout";

import ShoppingCart from "./components/cards/ShoppingCart";

import CheckoutPage from "./components/HarvestHub/CheckOutPage";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<AgricultureEcommerce />} />
					<Route path='/signin' element={<SignIn />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/companyprofile' element={<CompanyProfile />} />
					<Route
						path='/product/sayuran'
						element={<ProductPage category='Sayuran' />}
					/>
					<Route
						path='/product/buah'
						element={<ProductPage category='Buah' />}
					/>
					{/* <Route
						path='/productpage3'
						element={
							<ShoppingCart
								isOpen={true}
								toggleCart={() => {}}
								activeTab='cart'
							/>
						}
					/> */}
					<Route path='/sellerpage' element={<Dashboard />} />
					<Route path='/buyerpage' element={<BuyerPage />} />
					<Route path='/product/' element={<ProductPage />} />
					<Route path='/product/:id' element={<ProductDetailPage />} />
					<Route path='/review/:id' element={<ReviewDetailPage />} />
					<Route path='/checkout/:orderId' element={<CheckoutPage />} />
					<Route path='/transfer/:orderId' element={<TransferInstructions />} />
				</Route>
			</Routes>
		</Router>
		<Toaster></Toaster>
	</React.StrictMode>
);
