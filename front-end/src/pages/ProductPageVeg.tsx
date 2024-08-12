import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function VegetableProductPage() {
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
          <h1 className="text-2xl font-bold">Produk Sayuran</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Beras Merah.jpg"
              alt="Apple"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 10.000</div>
            <div className="text-gray-600">Beras Merah</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Kacang Mede.jpg"
              alt="Banana"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 12.000</div>
            <div className="text-gray-600">Kacang Mede</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Kol.jpg"
              alt="Orange"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 15.000</div>
            <div className="text-gray-600">Kol</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Terong.jpg"
              alt="Grape"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 20.000</div>
            <div className="text-gray-600">Terong</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Tomat.jpg"
              alt="Mango"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 18.000</div>
            <div className="text-gray-600">Tomat</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Tomat Ceri.jpg"
              alt="Watermelon"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 25.000</div>
            <div className="text-gray-600">Tomat Ceri</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Cabe Merah Keriting.jpg"
              alt="Strawberry"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 30.000</div>
            <div className="text-gray-600">Cabe Merah Keriting</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Cabe Rawit.jpg"
              alt="Kiwi"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 28.000</div>
            <div className="text-gray-600">Cabe Rawit</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Paprika.jpg"
              alt="Pineapple"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 22.000</div>
            <div className="text-gray-600">Paprika</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Lada Hitam.jpg"
              alt="Pear"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 14.000</div>
            <div className="text-gray-600">Lada Hitam</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Seledri.jpg"
              alt="Cherry"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 35.000</div>
            <div className="text-gray-600">Seledri</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Wortel.jpg"
              alt="Blueberry"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 40.000</div>
            <div className="text-gray-600">Wortel</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Jahe.jpg"
              alt="Avocado"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 25.000</div>
            <div className="text-gray-600">Jahe</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Bawang Bombai.jpg"
              alt="Papaya"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 13.000</div>
            <div className="text-gray-600">Bawang Bombai</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Bawang Putih.jpg"
              alt="Melon"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 18.000</div>
            <div className="text-gray-600">Bawang Putih</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Bawang Merah.jpg"
              alt="Pomegranate"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 32.000</div>
            <div className="text-gray-600">Bawang Merah</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Almond.jpg"
              alt="Grapefruit"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 22.000</div>
            <div className="text-gray-600">Almond</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Bayam.jpg"
              alt="Dragonfruit"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 28.000</div>
            <div className="text-gray-600">Bayam</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Timun.jpg"
              alt="Persimmon"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 26.000</div>
            <div className="text-gray-600">Timun</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Jagung.jpg"
              alt="Fig"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 45.000</div>
            <div className="text-gray-600">Jagung</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Kentang.jpg"
              alt="Lychee"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 30.000</div>
            <div className="text-gray-600">Kentang</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Brokoli.jpg"
              alt="Mangosteen"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 35.000</div>
            <div className="text-gray-600">Brokoli</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Kol Merah.jpg"
              alt="Coconut"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 15.000</div>
            <div className="text-gray-600">Kol Merah</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Daun Bawang.jpg"
              alt="Mangosteen"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 35.000</div>
            <div className="text-gray-600">Daun Bawang</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <img
              src="../images/Labu.jpg"
              alt="Coconut"
              className="w-full h-32 object-cover mb-4"
            />
            <div className="text-lg font-semibold">Rp 15.000</div>
            <div className="text-gray-600">Labu</div>
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

export default VegetableProductPage;
