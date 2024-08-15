import { Link } from "react-router-dom";

function App() {

	return (
		<div className="App">
			<Link to="/mainpage" className="mt-4 underline text-blue-600">
				Go to Main Page
			</Link>
			<Link to="/signin" className="mt-4 underline text-blue-600">
				Go to Sign In
			</Link>
			<Link to="/signup" className="mt-4 underline text-blue-600">
				Go to Sign Up
			</Link>
			<Link to="/companyprofile" className="mt-4 underline text-blue-600">
				Go to Company Profile
			</Link>
			<Link to="/productpage1" className="mt-4 underline text-blue-600">
				Go to Product Page Vegetables
			</Link>
			<Link to="/productpage2" className="mt-4 underline text-blue-600">
				Go to Product Page Fruit
			</Link>
			<Link to="/productpage3" className="mt-4 underline text-blue-600">
				Go to Product Page Bundling Package
			</Link>
			<Link to="/sellerpage" className="mt-4 underline text-blue-600">
				Go to Seller Page
			</Link>
			<Link to="/buyerpage" className="mt-4 underline text-blue-600">
				Go to Buyer Page
			</Link>
		</div>
	);
}

export default App;
