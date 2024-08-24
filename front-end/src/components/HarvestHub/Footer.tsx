// components/Footer.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-white p-8 shadow mt-8">
      <div className="container mx-auto flex justify-between items-start">
        <div className="mb-6 md:mb-0">
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
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-bold mb-2">HarvestHub</h3>
          <ul className="text-gray-700 space-y-2">
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
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-bold mb-2">Jual</h3>
          <ul className="text-gray-700 space-y-2">
            <li>
              <a href="#">Pusat Edukasi Seller</a>
            </li>
            <li>
              <a href="#">Daftar Official Store</a>
            </li>
          </ul>
        </div>
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-bold mb-2">Bantuan dan Panduan</h3>
          <ul className="text-gray-700 space-y-2">
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
  );
};

export default Footer;
