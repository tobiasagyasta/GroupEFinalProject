import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function BundlingPackagePage() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">
            <img
              src="../images/logoharvest.png"
              alt="HarvestHub Logo"
              className="h-10 w-auto"
            />
          </div>
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

        {/* Home and Tentang HarvestHub */}
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className="text-gray-700 border border-gray-300 rounded px-4 py-2 hover:text-blue-500 hover:shadow-md transition-shadow duration-300"
          >
            Home
          </Link>
          <a
            href="#"
            className="text-gray-700 border border-gray-300 rounded px-4 py-2 hover:text-blue-500 hover:shadow-md transition-shadow duration-300"
          >
            Tentang HarvestHub
          </a>
        </div>

        <div className="space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded hover:shadow-md transition-shadow duration-300">
            Masuk
          </button>
          <button className="bg-black text-white px-4 py-2 rounded hover:shadow-md transition-shadow duration-300">
            Daftar
          </button>
        </div>
      </nav>

      {/* Product Grid */}
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Bundling Package</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpeg"
              alt="Bundling Package 1"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 10.000</div>
            <div className="text-gray-600">Bundling Package 1</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 2"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 12.000</div>
            <div className="text-gray-600">Bundling Package 2</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 3"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 15.000</div>
            <div className="text-gray-600">Bundling Package 3</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 4"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 20.000</div>
            <div className="text-gray-600">Bundling Package 4</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 5"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 18.000</div>
            <div className="text-gray-600">Bundling Package 5</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 6"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 25.000</div>
            <div className="text-gray-600">Bundling Package 6</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 7"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 30.000</div>
            <div className="text-gray-600">Bundling Package 7</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 8"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 28.000</div>
            <div className="text-gray-600">Bundling Package 8</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 9"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 22.000</div>
            <div className="text-gray-600">Bundling Package 9</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 10"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 14.000</div>
            <div className="text-gray-600">Bundling Package 10</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 11"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 35.000</div>
            <div className="text-gray-600">Bundling Package 11</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 12"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 40.000</div>
            <div className="text-gray-600">Bundling Package 12</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 13"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 25.000</div>
            <div className="text-gray-600">Bundling Package 13</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 14"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 13.000</div>
            <div className="text-gray-600">Bundling Package 14</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 15"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 18.000</div>
            <div className="text-gray-600">Bundling Package 15</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 16"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 32.000</div>
            <div className="text-gray-600">Bundling Package 16</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 17"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 22.000</div>
            <div className="text-gray-600">Bundling Pacakge 17</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 18"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 28.000</div>
            <div className="text-gray-600">Bundling Package 18</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 19"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 26.000</div>
            <div className="text-gray-600">Bundling Package 19</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 20"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 45.000</div>
            <div className="text-gray-600">Bundling Package 20</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 21"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 30.000</div>
            <div className="text-gray-600">Bundling Package 21</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 22"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 35.000</div>
            <div className="text-gray-600">Bundling Package 22</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 23"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 15.000</div>
            <div className="text-gray-600">Bundling Package 23</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 24"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 35.000</div>
            <div className="text-gray-600">Bundling Package 24</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/.jpg"
              alt="Bundling Package 25"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 15.000</div>
            <div className="text-gray-600">Bundling Package 25</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white p-8 shadow mt-8">
        <div className="container mx-auto flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold mb-2">Follow Us</h3>
            <div className="space-x-4">
              <a href="#" className="text-gray-700">
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </a>
              <a href="#" className="text-gray-700">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="#" className="text-gray-700">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">HarvestHub</h3>
            <ul className="text-gray-700">
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Karir</a>
              </li>
              <li>
                <a href="#">Program Afiliasi</a>
              </li>
              <li>
                <a href="#">Promo</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Jual</h3>
            <ul className="text-gray-700">
              <li>
                <a href="#">Pusat Edukasi Seller</a>
              </li>
              <li>
                <a href="#">Daftar Official Store</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Bantuan dan Panduan</h3>
            <ul className="text-gray-700">
              <li>
                <a href="#">HarvestHub Care</a>
              </li>
              <li>
                <a href="#">Syarat dan Ketentuan</a>
              </li>
              <li>
                <a href="#">Kebijakan dan Privasi</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default BundlingPackagePage;
