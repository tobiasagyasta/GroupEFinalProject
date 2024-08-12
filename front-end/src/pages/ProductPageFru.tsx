import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function FruitProductPage() {
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
          <h1 className="text-2xl font-bold">Produk Buah</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Apel Malang.jpeg"
              alt="Apel Malang"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 10.000</div>
            <div className="text-gray-600">Apel Malang</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Anggur.jpg"
              alt="Anggur"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 12.000</div>
            <div className="text-gray-600">Anggur</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Nanas Pemalang.jpg"
              alt="Nanas Pemalang"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 15.000</div>
            <div className="text-gray-600">Nanas Pemalang</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Pepaya California.jpg"
              alt="GraPepaya Californiape"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 20.000</div>
            <div className="text-gray-600">Pepaya California</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Pisang Sunpride.jpg"
              alt="Pisang Sunpride"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 18.000</div>
            <div className="text-gray-600">Pisang Sunpride</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Belimbing.jpg"
              alt="Belimbing"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 25.000</div>
            <div className="text-gray-600">Belimbing</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Blueberry.jpg"
              alt="Blueberry"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 30.000</div>
            <div className="text-gray-600">Blueberry</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Buah Naga.jpg"
              alt="Buah Naga"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 28.000</div>
            <div className="text-gray-600">Buah Naga</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Cherry.jpg"
              alt="Ceri"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 22.000</div>
            <div className="text-gray-600">Ceri</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Durian.jpg"
              alt="Durian"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 14.000</div>
            <div className="text-gray-600">Durian</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Jambu.jpg"
              alt="Jambu"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 35.000</div>
            <div className="text-gray-600">Jambu</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Jeruk.jpg"
              alt="Jeruk"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 40.000</div>
            <div className="text-gray-600">Jeruk</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Alpukat Mentega.jpg"
              alt="Alpukat Mentega"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 25.000</div>
            <div className="text-gray-600">Alpukat Mentega</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Kelapa.jpg"
              alt="Kelapa"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 13.000</div>
            <div className="text-gray-600">Kelapa</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Lemon.jpg"
              alt="Lemon"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 18.000</div>
            <div className="text-gray-600">Lemon</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Mangga.jpg"
              alt="Mangga"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 32.000</div>
            <div className="text-gray-600">Mangga</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Manggis.jpg"
              alt="Manggis"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 22.000</div>
            <div className="text-gray-600">Manggis</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Melon.jpg"
              alt="Melon"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 28.000</div>
            <div className="text-gray-600">Melon</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Nangka.jpg"
              alt="Nangka"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 26.000</div>
            <div className="text-gray-600">Nangka</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Pir.jpg"
              alt="Pir"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 45.000</div>
            <div className="text-gray-600">Pir</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Semangka.jpg"
              alt="Semangka"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 30.000</div>
            <div className="text-gray-600">Semangka</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Strawberry.jpg"
              alt="Strawberry"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 35.000</div>
            <div className="text-gray-600">Strawberry</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Lychee.jpg"
              alt="Leci"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 15.000</div>
            <div className="text-gray-600">Leci</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Kiwi.jpg"
              alt="Kiwi"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 35.000</div>
            <div className="text-gray-600">Kiwi</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Jambu Air.jpg"
              alt="Jambu Air"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 15.000</div>
            <div className="text-gray-600">Jambu Air</div>
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

export default FruitProductPage;
