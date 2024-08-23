import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiBaseUrl } from "@/lib/api";

interface OrderItem {
	product_id: number;
	product_name: string;
	quantity: number;
	price: string; // or you can use number if you convert the price on the backend
	product_picture_url: string;
}

interface Order {
	order_id: number;
	buyer_id: number;
	total_price: string; // or number
	payment_method: string;
	order_date: string; // ISO date string
	items: OrderItem[];
}
const CheckoutPage: React.FC = () => {
	const { orderId } = useParams<{ orderId: string }>();
	const [order, setOrder] = useState<Order | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [address, setAddress] = useState("Alamat belum diisi");
	const [newAddress, setNewAddress] = useState(address);

	useEffect(() => {
		// Fetch the order data
		const fetchOrder = async () => {
			try {
				const response = await fetch(`${apiBaseUrl}/order/${orderId}`);
				const data = await response.json();
				setOrder(data);
			} catch (error) {
				console.error("Error fetching order:", error);
			}
		};

		if (orderId) fetchOrder();
	}, [orderId]);

	const formatPrice = (amount: string | number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(Number(amount));
	};

	const openAddressDialog = () => {
		setNewAddress(address);
		setIsDialogOpen(true);
	};

	const closeAddressDialog = () => {
		setIsDialogOpen(false);
	};

	const handleAddressUpdate = () => {
		setAddress(newAddress);
		closeAddressDialog();
	};

	const handlePaymentClick = () => {
		alert("Pembayaran berhasil");
	};

	if (!order) return <p>Loading...</p>;

	const totalCost = Number(order.total_price) + 8000 + 500 + 1000;

	return (
		<div className='flex flex-col md:flex-row gap-4 p-4 bg-gray-100'>
			<div className='container mx-auto px-4 md:px-8'>
				<div className='flex flex-col md:flex-row gap-4'>
					<div className='flex flex-col flex-1 md:w-3/4 gap-4'>
						<div className='bg-white shadow-md rounded-lg p-6'>
							<h2 className='text-lg font-semibold mb-4'>Pengiriman</h2>
							<div className='mb-4'>
								<h3 className='text-sm font-semibold'>ALAMAT PENGIRIMAN</h3>
								<p>{address}</p>
								<div className='flex space-x-4 mt-2'>
									<button className='text-blue-500' onClick={openAddressDialog}>
										Ganti Alamat
									</button>
								</div>
							</div>
						</div>
						<div className='bg-white shadow-lg rounded-lg p-6 flex'>
							<div className='flex-grow flex flex-col justify-between'>
								<div>
									<h3 className='text-lg font-semibold mb-2'>Rincian Produk</h3>
									{order.items.map((item) => (
										<div key={item.product_id} className='mb-4'>
											<img
												src={`/images/${item.product_picture_url}`}
												alt={item.product_name}
												className='w-16 h-16 object-cover rounded-md'
											/>
											<p className='text-xl font-semibold text-gray-900 mb-1'>
												{item.product_name}
											</p>
											<div className='flex justify-between text-gray-700 mb-1'>
												<p>
													{item.quantity} x {formatPrice(item.price)}
												</p>
												<span className='text-lg font-medium'>
													{formatPrice(Number(item.price) * item.quantity)}
												</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className='bg-white shadow-md rounded-lg p-6 flex-1 md:max-w-md'>
						<h3 className='text-sm font-semibold'>Ringkasan Belanja</h3>
						<div className='flex justify-between'>
							<p>Total Harga ({order.items.length} Barang)</p>
							<p>{formatPrice(order.total_price)}</p>
						</div>
						<div className='flex justify-between'>
							<p>Total Ongkos Kirim</p>
							<p>{formatPrice(8000)}</p>
						</div>
						<div className='flex justify-between'>
							<p>Total Asuransi Pengiriman</p>
							<p>{formatPrice(500)}</p>
						</div>
						<div className='flex justify-between'>
							<p>Biaya Jasa Aplikasi</p>
							<p>{formatPrice(1000)}</p>
						</div>
						<div className='flex justify-between font-semibold'>
							<p>Total Belanja</p>
							<p>{formatPrice(totalCost)}</p>
						</div>
						<button
							className='mt-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 w-full'
							onClick={handlePaymentClick}
						>
							Bayar
						</button>
					</div>
				</div>
			</div>
			<Dialog open={isDialogOpen} onOpenChange={closeAddressDialog}>
				<DialogContent className='w-full max-w-lg p-6 bg-gray-50'>
					<div className='relative bg-white rounded-lg shadow-xl p-6'>
						<DialogTitle className='text-2xl font-bold mb-4'>
							Edit Alamat Pengiriman
						</DialogTitle>
						<div className='mb-4'>
							<Label htmlFor='newAddress'>Alamat Pengiriman</Label>
							<Input
								id='newAddress'
								type='text'
								value={newAddress}
								onChange={(e) => setNewAddress(e.target.value)}
								placeholder='Masukkan alamat baru'
								className='mt-1 p-2 border border-gray-300 rounded-lg'
							/>
						</div>
						<div className='flex justify-end space-x-4'>
							<Button
								onClick={handleAddressUpdate}
								className='bg-green-500 text-white'
							>
								Simpan
							</Button>
							<Button
								onClick={closeAddressDialog}
								className='bg-green-500 text-white'
							>
								Tutup
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CheckoutPage;
