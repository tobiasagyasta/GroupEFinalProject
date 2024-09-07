import { useState, useEffect } from "react";
import { User } from "@/lib/types";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { fetchCurrentUser, apiBaseUrl, logout } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShoppingCartIcon from "../cards/ShoppingCartIcon";

const Header = () => {
	const [cartOpen, setCartOpen] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const navigate = useNavigate();

	const toggleCart = () => {
		setCartOpen(!cartOpen);
	};

	useEffect(() => {
		const fetchUser = async () => {
			const currentUser = await fetchCurrentUser();
			setUser(currentUser);
		};
		fetchUser();
	}, []);

	return (
		<nav className="bg-white shadow p-2 flex flex-col md:flex-row justify-between items-center sticky top-0 z-50">
			<Link to="/">
				<div className="text-xl font-semibold">
					<img
						src="../images/logo.png"
						alt="HarvestHub Logo"
						className="h-14 w-auto"
					/>
				</div>
			</Link>

			{user ? (
				<>
					<div className="flex items-center space-x-5 mr-10">
						{" "}
						<span className="text-sm">Welcome {user.name}!</span>
						<Avatar>
							<AvatarImage
								src={`${apiBaseUrl}/uploads/${user?.profile_picture_url}`}
								className="h-10 w-10"
							/>
							<AvatarFallback>{user.name[0]}</AvatarFallback>
						</Avatar>
						{user.role === "seller" ? (
							<Link to="/sellerpage">
								<button className="bg-green-500 text-white  h-11 w-24 px-3 py-1 rounded text-sm hover:shadow-md transition-shadow duration-300">
									Seller Page
								</button>
							</Link>
						) : (
							<>
								<ShoppingCartIcon isOpen={cartOpen} toggleCart={toggleCart} />
								<Link to="/buyerpage">
									<button className="bg-blue-500 text-white  h-11 w-24 px-3 py-1 rounded text-xs md:text-sm hover:shadow-md transition-shadow duration-300">
										Buyer Page
									</button>
								</Link>
							</>
						)}
						<button
							onClick={() => {
								logout();
								navigate("/");
								setUser(null);
							}}
							className="bg-gray-400 text-white  h-11 w-24 px-3 py-1 rounded text-sm hover:shadow-md transition-shadow duration-300"
						>
							Logout
						</button>
					</div>
				</>
			) : (
				<>
					<div className="flex items-center space-x-10 mr-10">
						<Link to="/signin">
							<button className="bg-gray-200 px-3 h-11 w-24 py-1 rounded text-sm hover:shadow-md transition-shadow duration-300">
								Masuk
							</button>
						</Link>
						<Link to="/signup">
							<button className="bg-black text-white h-11 w-24 px-3 py-1 rounded text-sm hover:shadow-md transition-shadow duration-300">
								Daftar
							</button>
						</Link>
					</div>
				</>
			)}
		</nav>
	);
};

export default Header;
