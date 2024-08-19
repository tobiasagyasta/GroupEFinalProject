import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebookF,
	faTwitter,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import Header from "@/lib/Header";
import Footer from "@/lib/Footer";

function BundlingPackagePage() {

  return (
    <div className="min-h-screen">
      <Header />

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

      <Footer />
    </div>
  );
}

export default BundlingPackagePage;
