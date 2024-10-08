import React, { useState, useEffect } from "react";
import { User } from "@/lib/types";
import { fetchCurrentUser } from "@/lib/api";
import UserSettings from "@/components/cards/UserSettings";
import AddProduct from "@/components/cards/AddProducts";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { apiBaseUrl } from "@/lib/api";
import MyProducts from "@/components/cards/MyProducts";

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
import { Button } from "@/components/ui/button";
import OrdersListSeller from "@/components/cards/OrdersListSeller";

export default function Dashboard() {
	const [isRevenueHidden, setRevenueHidden] = useState(false);
	const [dashboardState, setDashboardState] = useState("main");
	const showMain = () => setDashboardState("main");
	const showSettings = () => setDashboardState("settings");
	const showAddProduct = () => setDashboardState("addProducts");
	const showProducts = () => setDashboardState("products");
	const showOrders = () => setDashboardState("orders");
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		const fetchUser = async () => {
			const currentUser = await fetchCurrentUser();
			setUser(currentUser);
		};
		fetchUser();
	}, []);

	const toggleRevenueVisibility = () => {
		setRevenueHidden(!isRevenueHidden);
	};
	if (!user || user?.role !== "seller") {
		return (
			<h1 className="text-4xl text-center mt-4">
				Anda tidak bisa masuk ke sini! Silakan kembali ke beranda dan log in.
			</h1>
		);
	}

	return (
		<div className="min-h-screen flex flex-col">
			{/* Main content */}
			<div className="flex flex-1">
				{/* Sidebar */}
				<aside className="w-64 bg-white p-6">
					<div className="text-lg font-semibold mb-8 text-center">
						<span className="block text-sm text-gray-500">Welcome!</span>
						{user?.name}
						{user && (
							<Avatar>
								<AvatarImage
									src={`${apiBaseUrl}/uploads/${user?.profile_picture_url}`}
									alt="Profile Preview"
									className="w-[100px] h-[100px] mx-auto rounded-lg mt-4"
								/>
								<AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
							</Avatar>
						)}
					</div>
					<nav>
						<ul>
							<Button
								onClick={showMain}
								className="bg-transparent hover:bg-transparent p-4"
							>
								<SidebarItem icon={<FaHome />} label="Home" />
							</Button>

							<Button
								onClick={showAddProduct}
								className="bg-transparent hover:bg-transparent p-4"
							>
								<SidebarItem icon={<FaPlus />} label="Tambah Produk Baru" />
							</Button>

							<Button
								onClick={showProducts}
								className="bg-transparent hover:bg-transparent p-4"
							>
								<SidebarItem icon={<FaList />} label="Daftar Produk" />
							</Button>
							<Button
								onClick={showOrders}
								className="bg-transparent hover:bg-transparent p-4"
							>
								<SidebarItem icon={<FaTruck />} label="Pemesanan" />
							</Button>
							<Button
								onClick={showSettings}
								className="bg-transparent hover:bg-transparent p-4"
							>
								<SidebarItem icon={<FaCog />} label="Pengaturan" />
							</Button>
						</ul>
					</nav>
				</aside>
				{/* Dashboard Widgets */}
				{dashboardState == "main" && (
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
				)}
				{dashboardState == "settings" && <UserSettings></UserSettings>}
				{dashboardState === "products" && <MyProducts />}
				{dashboardState === "addProducts" && <AddProduct />}
				{dashboardState === "orders" && <OrdersListSeller />}
			</div>
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
