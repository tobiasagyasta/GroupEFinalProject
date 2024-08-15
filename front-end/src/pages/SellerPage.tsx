import React, { useState } from "react";
import {
  FaHome,
  FaComments,
  FaChartBar,
  FaPlus,
  FaList,
  FaBox,
  FaCog,
  FaSearch,
  FaBell,
  FaEyeSlash,
  FaUser,
  FaTruck,
  FaTag,
  FaChartLine,
  FaDiscord,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Dashboard() {
  const [isRevenueHidden, setRevenueHidden] = useState(false);

  const toggleRevenueVisibility = () => {
    setRevenueHidden(!isRevenueHidden);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold">
          <img
            src="../images/logoharvest.png"
            alt="HarvestHub Logo"
            className="h-10 w-auto"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative w-[400px]">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-400 px-4 py-2 pl-10 rounded-full focus:outline-none"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-500" />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <FaBell className="w-6 h-6 text-gray-700 hover:text-blue-500 cursor-pointer transition-colors duration-300" />
          <div className="flex items-center space-x-2">
            <FaUser className="w-6 h-6 text-gray-700 hover:text-blue-500 cursor-pointer transition-colors duration-300" />
            <span className="text-gray-700 hover:text-blue-500 cursor-pointer transition-colors duration-300">
              Nama Penjual
            </span>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white p-6">
          <div className="text-lg font-semibold mb-8">
            <span className="block text-sm text-gray-500">Seller Name</span>
            Silver Merchant
          </div>
          <nav>
            <ul>
              <SidebarItem icon={<FaHome />} label="Home" />
              <SidebarItem icon={<FaComments />} label="Chat" />
              <SidebarItem icon={<FaDiscord />} label="Diskusi" />
              <SidebarItem icon={<FaPlus />} label="Tambah Produk Baru" />
              <SidebarItem icon={<FaList />} label="Daftar Produk" />
              <SidebarItem icon={<FaTruck />} label="Pemesanan" />
              <SidebarItem icon={<FaChartBar />} label="Statistik" />
              <SidebarItem icon={<FaChartLine />} label="Performa Toko" />
              <SidebarItem icon={<FaTag />} label="Iklan & Promosi" />
              <SidebarItem icon={<FaCog />} label="Pengaturan" />
            </ul>
          </nav>
        </aside>

        {/* Dashboard Widgets */}
        <main
          className="flex-1 p-8"
          style={{
            backgroundImage: "url(../images/Background.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <section className="grid grid-cols-2 gap-6">
            <DashboardWidget
              title="Produk Dilihat"
              content="45"
              readMore={false}
            />
            <DashboardWidget
              title="Keranjang Pembeli"
              content="112"
              readMore={false}
            />
            <div
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={toggleRevenueVisibility}
            >
              <h3 className="text-lg font-semibold">Pendapatan</h3>
              <div className="flex items-center mt-2">
                <FaEyeSlash className="w-5 h-5 mr-2 text-gray-500" />
                <p className="text-2xl">
                  {isRevenueHidden ? "******" : "Rp 17.657.986"}
                </p>
              </div>
            </div>
            <DashboardWidget
              title="Rekomendasi"
              content={`1. Diversifikasi produk: Tawarkan berbagai jenis produk pertanian untuk menarik lebih banyak pembeli.\n2. Kolaborasi dengan petani lokal: Jalin kemitraan dengan petani untuk memastikan pasokan produk yang berkelanjutan.\n3. Gunakan teknologi: Integrasikan teknologi pertanian canggih seperti IoT untuk meningkatkan kualitas produk.`}
              readMore={true}
            />
            <DashboardWidget
              title="Cara Menaikkan Penjualan"
              content={`1. Optimalisasi harga: Tawarkan harga yang kompetitif dengan mempertimbangkan biaya produksi dan permintaan pasar.\n2. Penawaran produk organik: Produk pertanian organik semakin diminati, pertimbangkan untuk menambahkan produk ini ke katalog Anda.\n3. Kampanye promosi musiman: Manfaatkan musim panen tertentu untuk membuat kampanye promosi khusus yang menargetkan konsumen yang mencari produk segar.`}
              readMore={true}
            />
            <DashboardWidget
              title="Tips & Trick"
              content={`1. Kemasan yang ramah lingkungan: Gunakan kemasan yang dapat didaur ulang atau ramah lingkungan untuk menarik konsumen yang peduli terhadap lingkungan.\n2. Pengiriman cepat: Pastikan sistem logistik Anda efektif sehingga produk segar dapat sampai ke tangan konsumen dengan cepat.\n3. Edukasi pelanggan: Buat konten yang mengedukasi pelanggan tentang cara terbaik untuk menyimpan dan menggunakan produk pertanian yang mereka beli.`}
              readMore={true}
            />
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white p-8 shadow">
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

// Sidebar item component with hover effect
function SidebarItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <li className="mb-4">
      <a
        href="#"
        className="flex items-center text-gray-700 hover:text-blue-500 hover:bg-gray-100 p-2 rounded transition-all duration-300"
      >
        {icon}
        <span className="ml-2">{label}</span>
      </a>
    </li>
  );
}

// Dashboard widget component with "Read More" functionality
function DashboardWidget({
  title,
  content,
  readMore = true,
}: {
  title: string;
  content: string;
  readMore?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div
        className={`text-sm mt-2 overflow-hidden ${
          expanded ? "max-h-none" : "max-h-20"
        } whitespace-pre-wrap`}
      >
        {content}
      </div>
      {readMore && (
        <button
          onClick={toggleExpand}
          className="mt-2 text-blue-500 hover:underline focus:outline-none"
        >
          {expanded ? "Tutup tampilan" : "Baca selengkapnya"}
        </button>
      )}
    </div>
  );
}
