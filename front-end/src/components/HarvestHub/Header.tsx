// components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold">
        <Link to="/">
          <img
            src="../images/logo.png"
            alt="HarvestHub Logo"
            className="h-10 w-auto cursor-pointer"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative w-[400px]">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-400 px-4 py-2 pl-10 rounded-full focus:outline-none"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
          </div>
        </div>
      </div>

      <div className="space-x-4">
        <Link to="/companyprofile">
          <a
            href="#"
            className="text-gray-700 border border-gray-300 rounded px-4 py-2 hover:text-blue-500 hover:shadow-md transition-shadow duration-300"
          >
            Tentang HarvestHub
          </a>
        </Link>
      </div>

      <div className="space-x-4">
        <Link to="/signin">
          <button className="bg-gray-200 px-4 py-2 rounded hover:shadow-md transition-shadow duration-300">
            Masuk
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-black text-white px-4 py-2 rounded hover:shadow-md transition-shadow duration-300">
            Daftar
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
