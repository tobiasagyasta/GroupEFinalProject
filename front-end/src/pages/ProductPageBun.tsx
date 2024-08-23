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
      {/* Product Grid */}
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Bundling Package</h1>
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/51`}>
              <img
                src="../images/ayam-jagung.jpg"
                alt="Ayam & Tomat"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 10.000</div>
              <div className="text-gray-600">Ayam & Jagung</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/52`}>
              <img
                src="../images/ayam-tomat.jpg"
                alt="Ayam Tomat"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 12.000</div>
              <div className="text-gray-600">Ayam & Tomat</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/53`}>
              <img
                src="../images/dada-ayam-selada.jpg"
                alt="Dada Ayam Selada"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 15.000</div>
              <div className="text-gray-600">Dada Ayam & Selada</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/54`}>
              <img
                src="../images/daging-sapi-sayur.jpg"
                alt="Daging Sapi Sayur"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 20.000</div>
              <div className="text-gray-600">Daging Sapi & Sayur</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/55`}>
              <img
                src="../images/daun-bawang-wortel.jpg"
                alt="Daun Bawang Wortel"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 18.000</div>
              <div className="text-gray-600">Daun Bawang & Wortel</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/56`}>
              <img
                src="../images/kacang-mix.jpg"
                alt="Kacang Mix"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 25.000</div>
              <div className="text-gray-600">Kacang Mix</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/57`}>
              <img
                src="../images/kentang-nugget.jpg"
                alt="Kentang Nugget"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 30.000</div>
              <div className="text-gray-600">Kentang & Nugget</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/58`}>
              <img
                src="../images/labu-kol.jpg"
                alt="Labu Kol"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 28.000</div>
              <div className="text-gray-600">Labu & Kol</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/59`}>
              <img
                src="../images/labu-ubi.jpg"
                alt="Labu Ubi"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 22.000</div>
              <div className="text-gray-600">Labu & Ubi</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/60`}>
              <img
                src="../images/nanas-semangka.jpg"
                alt="Nanas Semangka"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 14.000</div>
              <div className="text-gray-600">Nanas & Semangka</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/61`}>
              <img
                src="../images/paket-kebab.jpg"
                alt="Paket Kebab"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 35.000</div>
              <div className="text-gray-600">Paket Kebab</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/62`}>
              <img
                src="../images/paket-salad-1.jpg"
                alt="Paket Salad 1"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 40.000</div>
              <div className="text-gray-600">Paket Salad 1</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/63`}>
              <img
                src="../images/paket-salad-2.jpg"
                alt="Paket Salad 2"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 25.000</div>
              <div className="text-gray-600">Paket Salad 2</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/64`}>
              <img
                src="../images/paket-sayur-sop.jpg"
                alt="Paket Sayur Sop"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 13.000</div>
              <div className="text-gray-600">Paket Sayur Sop</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/65`}>
              <img
                src="../images/pisang-mangga.jpg"
                alt="Pisang Mangga"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 18.000</div>
              <div className="text-gray-600">Pisang & Mangga</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/66`}>
              <img
                src="../images/sayur-buah.jpg"
                alt="Sayur Buah"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 32.000</div>
              <div className="text-gray-600">Sayur & Buah</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/67`}>
              <img
                src="../images/timun-paprika.jpg"
                alt="Timun Paprika"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 22.000</div>
              <div className="text-gray-600">Timun & Paprika</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/68`}>
              <img
                src="../images/timun-strawberry.jpg"
                alt="Timun Strawberry"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 28.000</div>
              <div className="text-gray-600">Timun & Strawberry</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/69`}>
              <img
                src="../images/tomat-bawang.jpg"
                alt="Tomat Bawang"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 26.000</div>
              <div className="text-gray-600">Tomat & Bawang</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/70`}>
              <img
                src="../images/tomat-cabe.jpg"
                alt="Tomat Cabe"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 45.000</div>
              <div className="text-gray-600">Tomat & Cabe</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/71`}>
              <img
                src="../images/daging-sapi-kentang.jpg"
                alt="Daging Sapi Kentang"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 30.000</div>
              <div className="text-gray-600">Daging Sapi & Kentang</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/72`}>
              <img
                src="../images/tomat-daun-bawang.jpg"
                alt="Tomat Daun Bawang"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 35.000</div>
              <div className="text-gray-600">Tomat & Daun Bawang</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/73`}>
              <img
                src="../images/tomat-hijau.jpg"
                alt="Tomat Hijau"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 15.000</div>
              <div className="text-gray-600">Tomat Hijau</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/74`}>
              <img
                src="../images/ubi-sawi.jpg"
                alt="Ubi Sawi"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 35.000</div>
              <div className="text-gray-600">Ubi & Sawi</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/75`}>
              <img
                src="../images/wortel-jagung.jpg"
                alt="Wortel Jagung"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 15.000</div>
              <div className="text-gray-600">Wortel & Jagung</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BundlingPackagePage;
