import React from "react";
import { Link } from "react-router-dom";

function VegetableProductPage() {
  return (
    <div className="min-h-screen">
      {/* Product Grid */}
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Produk Sayuran</h1>
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/1`}>
              <img
                src="../images/beras-merah.jpg"
                alt="Beras merah"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 10.000</div>
              <div className="text-gray-600">Beras Merah</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/2`}>
              <img
                src="../images/kacang-mede.jpg"
                alt="Banana"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 12.000</div>
              <div className="text-gray-600">Kacang Mede</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/3`}>
              <img
                src="../images/kol.jpg"
                alt="Orange"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 15.000</div>
              <div className="text-gray-600">Kol</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/4`}>
              <img
                src="../images/terong.jpg"
                alt="Terong"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 20.000</div>
              <div className="text-gray-600">Terong</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/5`}>
              <img
                src="../images/tomat.jpg"
                alt="Tomat"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 18.000</div>
              <div className="text-gray-600">Tomat</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/6`}>
              <img
                src="../images/tomat-ceri.jpg"
                alt="Tomat Ceri"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 25.000</div>
              <div className="text-gray-600">Tomat Ceri</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/7`}>
              <img
                src="../images/cabe-merah-keriting.jpg"
                alt="Cabe Merah Keriting"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 30.000</div>
              <div className="text-gray-600">Cabe Merah Keriting</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/8`}>
              <img
                src="../images/cabe-rawit.jpg"
                alt="Cabe Rawit"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 28.000</div>
              <div className="text-gray-600">Cabe Rawit</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/9`}>
              <img
                src="../images/paprika.jpg"
                alt="paprika"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 22.000</div>
              <div className="text-gray-600">Paprika</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/10`}>
              <img
                src="../images/lada-hitam.jpg"
                alt="Lada Hitam"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 14.000</div>
              <div className="text-gray-600">Lada Hitam</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/11`}>
              <img
                src="../images/seledri.jpg"
                alt="Seledri"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 35.000</div>
              <div className="text-gray-600">Seledri</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/12`}>
              <img
                src="../images/wortel.jpg"
                alt="Wortel"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 40.000</div>
              <div className="text-gray-600">Wortel</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/13`}>
              <img
                src="../images/jahe.jpg"
                alt="Jahe"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 25.000</div>
              <div className="text-gray-600">Jahe</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/14`}>
              <img
                src="../images/bawang-bombai.jpg"
                alt="Bawang Bombai"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 13.000</div>
              <div className="text-gray-600">Bawang Bombai</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/15`}>
              <img
                src="../images/bawang-putih.jpg"
                alt="Bawang Putih"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 18.000</div>
              <div className="text-gray-600">Bawang Putih</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/16`}>
              <img
                src="../images/bawang-merah.jpg"
                alt="Bawang Merah"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 32.000</div>
              <div className="text-gray-600">Bawang Merah</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/17`}>
              <img
                src="../images/almond.jpg"
                alt="Almond"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 22.000</div>
              <div className="text-gray-600">Almond</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/18`}>
              <img
                src="../images/bayam.jpg"
                alt="Bayam"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 28.000</div>
              <div className="text-gray-600">Bayam</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/19`}>
              <img
                src="../images/timun.jpg"
                alt="Timun"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 26.000</div>
              <div className="text-gray-600">Timun</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/20`}>
              <img
                src="../images/jagung.jpg"
                alt="Jagung"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 45.000</div>
              <div className="text-gray-600">Jagung</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/21`}>
              <img
                src="../images/kentang.jpg"
                alt="Kentang"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 30.000</div>
              <div className="text-gray-600">Kentang</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/22`}>
              <img
                src="../images/brokoli.jpg"
                alt="Brokoli"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 35.000</div>
              <div className="text-gray-600">Brokoli</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/23`}>
              <img
                src="../images/kol-merah.jpg"
                alt="Kol Merah"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 15.000</div>
              <div className="text-gray-600">Kol Merah</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/24`}>
              <img
                src="../images/daun-bawang.jpg"
                alt="Daun Bawang"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 35.000</div>
              <div className="text-gray-600">Daun Bawang</div>
            </Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Link to={`/product/25`}>
              <img
                src="../images/labu.jpg"
                alt="Labu"
                className="w-full h-32 object-cover mb-4"
              />
              <div className="text-lg font-semibold">Rp 15.000</div>
              <div className="text-gray-600">Labu</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VegetableProductPage;
