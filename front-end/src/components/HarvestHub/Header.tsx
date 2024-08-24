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
            className="h-8 w-auto"
          />
        </div>
      </Link>

      <div className="relative w-[250px] sm:w-[300px] md:w-[400px]">
        <input
          type="text"
          placeholder="Search"
          className="w-full border border-gray-300 px-3 py-1 pl-8 rounded-full text-sm focus:outline-none"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 text-sm" />
        </div>
      </div>

      <div className="flex space-x-2">
        <Link to="/companyprofile">
          <button className="text-gray-700 border border-gray-300 rounded px-3 py-1 text-sm hover:text-blue-500 hover:shadow-md transition-shadow duration-300">
            Tentang HarvestHub
          </button>
        </Link>
      </div>

      {user ? (
        <>
          <div className="flex items-center space-x-2">
            {" "}
            <span className="text-sm">Welcome {user.name}!</span>
            <Avatar>
              <AvatarImage
                src={`${apiBaseUrl}/uploads/${user?.profile_picture_url}`}
                className="h-6 w-6"
              />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            {user.role === "seller" ? (
              <Link to="/sellerpage">
                <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:shadow-md transition-shadow duration-300">
                  Seller Page
                </button>
              </Link>
            ) : (
              <>
                <ShoppingCartIcon isOpen={cartOpen} toggleCart={toggleCart} />
                <Link to="/buyerpage">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs md:text-sm hover:shadow-md transition-shadow duration-300">
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
              className="bg-gray-400 text-white px-3 py-1 rounded text-sm hover:shadow-md transition-shadow duration-300"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center space-x-2">
            <Link to="/signin">
              <button className="bg-gray-200 px-3 py-1 rounded text-sm hover:shadow-md transition-shadow duration-300">
                Masuk
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-black text-white px-3 py-1 rounded text-sm hover:shadow-md transition-shadow duration-300">
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
