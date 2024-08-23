import React, { useState, useEffect } from "react";
import { fetchCurrentUser, apiBaseUrl } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	FaSearch,
	FaInbox,
	FaCommentAlt,
	FaBoxOpen,
	FaTruckLoading,
	FaStar,
	FaHeart,
	FaUserCog,
	FaShoppingCart,
	FaBell,
	FaEnvelope,
} from "react-icons/fa";
import { User } from "@/lib/types";
import ReviewsByBuyer from "@/components/cards/ReviewsByBuyer";
import ShoppingCart from "../components/cards/ShoppingCart";
import LikesByUser from "@/components/cards/LikesByUser";
import OrdersListBuyer from "@/components/cards/OrdersListBuyer";
interface OrderItem {
	product_id: number;
	product_name: string;
	quantity: number;
	price: string;
	product_picture_url: string;
}

interface Order {
	order_id: number;
	buyer_id: number;
	total_price: string;
	payment_method: string;
	order_date: string;
	status: string;
	items: OrderItem[];
	transaction_id: string;
}

export default function BuyerPage() {
	const [buyerId, setBuyerId] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [selectedMenu, setSelectedMenu] = useState<string>("Pengaturan");
	const [isCartOpen, setCartOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("cart");

	useEffect(() => {
		const fetchUser = async () => {
			const currentUser = await fetchCurrentUser();
			setUser(currentUser);
			if (currentUser) {
				// Fetch the buyer ID
				const response = await fetch(
					`${apiBaseUrl}/users/get-buyer-id/${currentUser.id}`
				);
				const data = await response.json();

				if (response.ok) {
					setBuyerId(data.buyer_id);
				} else {
					console.error("Failed to fetch buyer ID:", data.error);
				}
			}
		};
		fetchUser();
	}, []);

	const [notifications, setNotifications] = useState({
		pembayaran: false,
		konfirmasi: false,
		diproses: false,
		dikirim: false,
		selesai: false,
	});

	const toggleCart = () => setCartOpen(!isCartOpen);

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNotifications({
			...notifications,
			[event.target.name]: event.target.checked,
		});
	};

	const menuItems = [
		{ label: "Pesanan Saya", icon: <FaBoxOpen /> },
		{ label: "Kotak Masuk", icon: <FaInbox /> },
		{ label: "Ulasan", icon: <FaStar /> },
		{ label: "Favorit Saya", icon: <FaHeart /> },
		{ label: "Pengaturan", icon: <FaUserCog /> },
	];

	return (
		<div className='min-h-screen flex flex-col'>
			{/* Cart Pop-up
			<ShoppingCart
				isOpen={isCartOpen}
				toggleCart={toggleCart}
				activeTab={activeTab}
			/> */}

			{/* Main content */}
			<div className='flex flex-1'>
				{/* Sidebar */}
				<aside className='w-64 bg-white p-6 shadow-md'>
					<nav>
						<ul>
							{menuItems.map(({ label, icon }) => (
								<SidebarItem
									key={label}
									icon={icon}
									label={label}
									onClick={() => setSelectedMenu(label)}
								/>
							))}
						</ul>
					</nav>
				</aside>

				{/* Dashboard Widgets */}
				<main className='flex-1 p-8'>
					{selectedMenu === "Pengaturan" && (
						<Tabs>
							<TabsList>
								<TabsTrigger value='biodata'>Biodata Diri</TabsTrigger>
								<TabsTrigger value='alamat'>Daftar Alamat</TabsTrigger>
								<TabsTrigger value='rekening'>Rekening</TabsTrigger>
								<TabsTrigger value='notifikasi'>Notifikasi</TabsTrigger>
							</TabsList>
							<TabsContent
								value='biodata'
								className='p-4 bg-white shadow-md rounded-lg'
							>
								<h3 className='text-lg font-semibold'>Biodata Diri</h3>
								<p>Nama: Ira Nbbn</p>
								<p>Email: ira@gmail.com</p>
								<p>Telepon: +62 83974747447</p>
								<button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
									Edit Profil
								</button>
							</TabsContent>
							<TabsContent
								value='alamat'
								className='p-4 bg-white shadow-md rounded-lg'
							>
								<h3 className='text-lg font-semibold'>Daftar Alamat</h3>
								<ul>
									<li className='border-b py-2'>
										<p>Alamat 1: Jalan Raya No. 123, Jakarta</p>
										<button className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'>
											Edit
										</button>
									</li>
									<li className='border-b py-2'>
										<p>Alamat 2: Jalan Kemenangan No. 45, Bandung</p>
										<button className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'>
											Edit
										</button>
									</li>
								</ul>
								<button className='mt-4 px-4 py-2 bg-green-500 text-white rounded'>
									Tambah Alamat
								</button>
							</TabsContent>
							<TabsContent
								value='rekening'
								className='p-4 bg-white shadow-md rounded-lg'
							>
								<h3 className='text-lg font-semibold'>Rekening</h3>
								<ul>
									<li className='border-b py-2'>
										<p>Rekening Bank: Bank Agriculture - 1234567890</p>
										<button className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'>
											Edit
										</button>
									</li>
								</ul>
								<button className='mt-4 px-4 py-2 bg-green-500 text-white rounded'>
									Tambah Rekening
								</button>
							</TabsContent>
							<TabsContent
								value='notifikasi'
								className='p-4 bg-white shadow-md rounded-lg'
							>
								<h3 className='text-lg font-semibold'>Notifikasi</h3>
								<ul>
									<li className='border-b py-2 flex items-center'>
										<input
											type='checkbox'
											name='pembayaran'
											checked={notifications.pembayaran}
											onChange={handleCheckboxChange}
											className='mr-2'
										/>
										<label>Menunggu Pembayaran</label>
									</li>
									<li className='border-b py-2 flex items-center'>
										<input
											type='checkbox'
											name='konfirmasi'
											checked={notifications.konfirmasi}
											onChange={handleCheckboxChange}
											className='mr-2'
										/>
										<label>Menunggu Konfirmasi</label>
									</li>
									<li className='border-b py-2 flex items-center'>
										<input
											type='checkbox'
											name='diproses'
											checked={notifications.diproses}
											onChange={handleCheckboxChange}
											className='mr-2'
										/>
										<label>Pesanan Diproses</label>
									</li>
									<li className='border-b py-2 flex items-center'>
										<input
											type='checkbox'
											name='dikirim'
											checked={notifications.dikirim}
											onChange={handleCheckboxChange}
											className='mr-2'
										/>
										<label>Pesanan Dikirim</label>
									</li>
									<li className='border-b py-2 flex items-center'>
										<input
											type='checkbox'
											name='selesai'
											checked={notifications.selesai}
											onChange={handleCheckboxChange}
											className='mr-2'
										/>
										<label>Pesanan Selesai</label>
									</li>
								</ul>
							</TabsContent>
						</Tabs>
					)}

					{/* Pesanan Dikomplain */}
					{selectedMenu === "Pesanan Dikomplain" && (
						<Tabs>
							<TabsList>
								<TabsTrigger value='lihat'>Lihat Komplain</TabsTrigger>
								<TabsTrigger value='ajukan'>Ajukan Komplain</TabsTrigger>
							</TabsList>
							<TabsContent
								value='lihat'
								className='p-4 bg-white shadow-md rounded-lg'
							>
								<h3 className='text-lg font-semibold'>Lihat Komplain</h3>
								<p>Lihat komplain yang sudah diajukan.</p>
							</TabsContent>
							<TabsContent
								value='ajukan'
								className='p-4 bg-white shadow-md rounded-lg'
							>
								<h3 className='text-lg font-semibold'>Ajukan Komplain</h3>
								<p>Ajukan komplain baru.</p>
							</TabsContent>
						</Tabs>
					)}

					{/* Kotak Masuk */}
					{selectedMenu === "Kotak Masuk" && (
						<Tabs>
							<TabsList>
								<TabsTrigger value='inbox'>Inbox</TabsTrigger>
								<TabsTrigger value='komplain'>Komplain</TabsTrigger>
							</TabsList>
							<TabsContent
								value='inbox'
								className='p-4 bg-white shadow-md rounded-lg'
							>
								<h3 className='text-lg font-semibold'>Inbox</h3>
								<p>Lihat Pesanmu disini</p>
							</TabsContent>
							<TabsContent
								value='komplain'
								className='p-4 bg-white shadow-md rounded-lg'
							>
								<h3 className='text-lg font-semibold'>Lihat Komplain</h3>
								<p>Lihat komplain yang sudah diajukan.</p>
							</TabsContent>
						</Tabs>
					)}

					{/* Menunggu Pembayaran */}
					{selectedMenu === "Menunggu Pembayaran" && (
						<div className='p-4 bg-white shadow-md rounded-lg'>
							<h3 className='text-lg font-semibold'>Menunggu Pembayaran</h3>
							<p>Kamu punya pembayaran yang masih menunggu.</p>
						</div>
					)}

					{selectedMenu === "Ulasan" && buyerId && (
						<ReviewsByBuyer buyer_id={buyerId}></ReviewsByBuyer>
					)}

					{/* Pesananan Saya */}
					{selectedMenu === "Pesanan Saya" && (
						<OrdersListBuyer></OrdersListBuyer>
					)}

					{/* Favorit Saya */}
					{selectedMenu === "Favorit Saya" && <LikesByUser></LikesByUser>}
				</main>
			</div>
		</div>
	);
}

interface SidebarItemProps {
	icon: React.ReactNode;
	label: string;
	onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, onClick }) => {
	return (
		<li
			className='flex items-center space-x-3 mb-4 cursor-pointer'
			onClick={onClick}
		>
			<div className='text-xl'>{icon}</div>
			<span className='text-gray-700'>{label}</span>
		</li>
	);
};

interface ProductCardProps {
	imageUrl: string;
	name: string;
	price: string;
	location: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
	imageUrl,
	name,
	price,
	location,
}) => {
	return (
		<div className='bg-white shadow-md rounded-lg overflow-hidden'>
			<img src={imageUrl} alt={name} className='w-full h-40 object-cover' />
			<div className='p-4'>
				<h4 className='text-lg font-semibold'>{name}</h4>
				<p className='text-gray-600'>{price}</p>
				<p className='text-gray-500'>{location}</p>
				<button className='mt-2 w-full bg-green-800 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors'>
					+ Keranjang
				</button>
			</div>
		</div>
	);
};
