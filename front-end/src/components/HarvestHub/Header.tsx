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
		<nav className='bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50'>
			<Link to='/'>
				<div className='text-2xl font-bold'>
					<img
						src='../images/logo.png'
						alt='HarvestHub Logo'
						className='h-10 w-auto'
					/>
				</div>
			</Link>

			<div className='flex items-center space-x-4'>
				<div className='relative w-[400px]'>
					<input
						type='text'
						placeholder='Search'
						className='border border-gray-400 px-4 py-2 pl-10 rounded-full focus:outline-none'
					/>
					<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
						<FontAwesomeIcon icon={faSearch} className='text-gray-500' />
					</div>
				</div>
			</div>

			<div className='space-x-4'>
				<Link to='/companyprofile'>
					<button className='text-gray-700 border border-gray-300 rounded px-4 py-2 hover:text-blue-500 hover:shadow-md transition-shadow duration-300'>
						Tentang HarvestHub
					</button>
				</Link>
			</div>

			{user ? (
				<>
					<div className='flex flex-row items-center justify-center gap-4'>
						<h1>Welcome {user.name}!</h1>
						<Avatar>
							<AvatarImage
								src={`${apiBaseUrl}/uploads/${user?.profile_picture_url}`}
							/>
							<AvatarFallback>{user.name[0]}</AvatarFallback>
						</Avatar>

						{/* Conditional rendering based on user role */}
						{user.role === "seller" ? (
							<Link to='/sellerpage'>
								<button className='bg-green-500 text-white px-4 py-2 rounded hover:shadow-md transition-shadow duration-300'>
									Seller Page
								</button>
							</Link>
						) : (
							<>
								<ShoppingCartIcon isOpen={cartOpen} toggleCart={toggleCart} />
								<Link to='/buyerpage'>
									<button className='bg-blue-500 text-white px-4 py-2 rounded hover:shadow-md transition-shadow duration-300'>
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
							className='bg-gray-400 text-white px-4 py-2 rounded hover:shadow-md transition-shadow duration-300'
						>
							Logout
						</button>
					</div>
				</>
			) : (
				<>
					<div className='space-x-4'>
						<Link to='/signin'>
							<button className='bg-gray-200 px-4 py-2 rounded hover:shadow-md transition-shadow duration-300'>
								Masuk
							</button>
						</Link>
						<Link to='/signup'>
							<button className='bg-black text-white px-4 py-2 rounded hover:shadow-md transition-shadow duration-300'>
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
