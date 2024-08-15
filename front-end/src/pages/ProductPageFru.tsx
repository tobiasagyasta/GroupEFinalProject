import React from "react";
import { Link } from "react-router-dom";
import Header from "@/lib/Header";
import Footer from "@/lib/Footer";

function FruitProductPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Product Grid */}
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Produk Buah</h1>
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/26`}>
              <img
                src="../images/Apel Malang.jpeg"
                alt="Apel Malang"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 10.000</div>
              <div className="text-gray-600">Apel Malang</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/27`}>
              <img
                src="../images/Anggur.jpg"
                alt="Anggur"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 12.000</div>
              <div className="text-gray-600">Anggur</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/28`}>
              <img
                src="../images/Nanas Pemalang.jpg"
                alt="Nanas Pemalang"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 15.000</div>
              <div className="text-gray-600">Nanas Pemalang</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/29`}>
              <img
                src="../images/Pepaya California.jpg"
                alt="GraPepaya Californiape"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 20.000</div>
              <div className="text-gray-600">Pepaya California</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/30`}>
              <img
                src="../images/Pisang Sunpride.jpg"
                alt="Pisang Sunpride"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 18.000</div>
              <div className="text-gray-600">Pisang Sunpride</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/31`}>
              <img
                src="../images/Belimbing.jpg"
                alt="Belimbing"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 25.000</div>
              <div className="text-gray-600">Belimbing</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/32`}>
              <img
                src="../images/Blueberry.jpg"
                alt="Blueberry"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 30.000</div>
              <div className="text-gray-600">Blueberry</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/33`}>
              <img
                src="../images/Buah Naga.jpg"
                alt="Buah Naga"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 28.000</div>
              <div className="text-gray-600">Buah Naga</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/34`}>
              <img
                src="../images/Cherry.jpg"
                alt="Ceri"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 22.000</div>
              <div className="text-gray-600">Ceri</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/35`}>
              <img
                src="../images/Durian.jpg"
                alt="Durian"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 14.000</div>
              <div className="text-gray-600">Durian</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/36`}>
              <img
                src="../images/Jambu.jpg"
                alt="Jambu"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 35.000</div>
              <div className="text-gray-600">Jambu</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/37`}>
              <img
                src="../images/Jeruk.jpg"
                alt="Jeruk"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 40.000</div>
              <div className="text-gray-600">Jeruk</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/38`}>
              <img
                src="../images/Alpukat Mentega.jpg"
                alt="Alpukat Mentega"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 25.000</div>
              <div className="text-gray-600">Alpukat Mentega</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/39`}>
              <img
                src="../images/Kelapa.jpg"
                alt="Kelapa"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 13.000</div>
              <div className="text-gray-600">Kelapa</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/40`}>
              <img
                src="../images/Lemon.jpg"
                alt="Lemon"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 18.000</div>
              <div className="text-gray-600">Lemon</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/41`}>
              <img
                src="../images/Mangga.jpg"
                alt="Mangga"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 32.000</div>
              <div className="text-gray-600">Mangga</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/42`}>
              <img
                src="../images/Manggis.jpg"
                alt="Manggis"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 22.000</div>
              <div className="text-gray-600">Manggis</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/43`}>
              <img
                src="../images/Melon.jpg"
                alt="Melon"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 28.000</div>
              <div className="text-gray-600">Melon</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/44`}>
              <img
                src="../images/Nangka.jpg"
                alt="Nangka"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 26.000</div>
              <div className="text-gray-600">Nangka</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/45`}>
              <img
                src="../images/Pir.jpg"
                alt="Pir"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 45.000</div>
              <div className="text-gray-600">Pir</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/46`}>
              <img
                src="../images/Semangka.jpg"
                alt="Semangka"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 30.000</div>
              <div className="text-gray-600">Semangka</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/47`}>
              <img
                src="../images/Strawberry.jpg"
                alt="Strawberry"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 35.000</div>
              <div className="text-gray-600">Strawberry</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/48`}>
              <img
                src="../images/Lychee.jpg"
                alt="Leci"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 15.000</div>
              <div className="text-gray-600">Leci</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/49`}>
              <img
                src="../images/Kiwi.jpg"
                alt="Kiwi"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 35.000</div>
              <div className="text-gray-600">Kiwi</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/50`}>
              <img
                src="../images/Jambu Air.jpg"
                alt="Jambu Air"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 15.000</div>
              <div className="text-gray-600">Jambu Air</div>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FruitProductPage;
