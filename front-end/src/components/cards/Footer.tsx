import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebookF,
	faTwitter,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
	return (
		<footer className="bg-white p-8 shadow mt-8">
			<div className="container mx-auto flex justify-between items-start">
				<div>
					<h3 className="text-lg font-bold mb-2">Follow Us</h3>
					<div className="space-x-4">
						<button className="text-gray-700">
							<FontAwesomeIcon icon={faFacebookF} size="lg" />
						</button>
						<button className="text-gray-700">
							<FontAwesomeIcon icon={faTwitter} size="lg" />
						</button>
						<button className="text-gray-700">
							<FontAwesomeIcon icon={faInstagram} size="lg" />
						</button>
					</div>
				</div>
				<div>
					<h3 className="text-lg font-bold mb-2">HarvestHub</h3>
					<ul className="text-gray-700">
						<li>
							<button>Blog</button>
						</li>
						<li>
							<button>Karir</button>
						</li>
						<li>
							<button>Program Afiliasi</button>
						</li>
						<li>
							<button>Promo</button>
						</li>
					</ul>
				</div>
				<div>
					<h3 className="text-lg font-bold mb-2">Jual</h3>
					<ul className="text-gray-700">
						<li>
							<button>Pusat Edukasi Seller</button>
						</li>
						<li>
							<button>Daftar Official Store</button>
						</li>
					</ul>
				</div>
				<div>
					<h3 className="text-lg font-bold mb-2">Bantuan dan Panduan</h3>
					<ul className="text-gray-700">
						<li>
							<button>HarvestHub Care</button>
						</li>
						<li>
							<button>Syarat dan Ketentuan</button>
						</li>
						<li>
							<button>Kebijakan dan Privasi</button>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
