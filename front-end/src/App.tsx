import { Link } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Link to="/signin" className="mt-4 underline text-blue-600">
				Go to Sign In
			</Link>
		</div>
	);
}

export default App;
