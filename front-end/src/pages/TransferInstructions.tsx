import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "@/lib/api";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";

interface OrderItem {
	product_id: number;
	seller_id: number;
	product_name: string;
	quantity: number;
	price: string;
	product_picture_url: string;
}

interface TransferInstructionsData {
	order_id: number;
	buyer_id: number;
	total_price: string;
	payment_method: string;
	order_date: string;
	items: OrderItem[];
	transaction_id: string;
	status: string;
}

interface SellerInfo {
	seller_id: number;
	account_number: string;
	farm_name: string;
}

const TransferInstructions: React.FC = () => {
	const { orderId } = useParams<{ orderId: string }>();
	const [data, setData] = useState<TransferInstructionsData | null>(null);
	const [sellersInfo, setSellersInfo] = useState<SellerInfo[]>([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchOrderData = async () => {
			try {
				const response = await fetch(`${apiBaseUrl}/order/${orderId}`);
				if (!response.ok) {
					throw new Error("Failed to fetch order data");
				}
				const orderData: TransferInstructionsData = await response.json();
				if (orderData.status === "pending") {
					navigate("/");
				} else {
					setData(orderData);

					// Collect unique seller IDs from order items
					const sellerIds = Array.from(
						new Set(orderData.items.map((item) => item.seller_id))
					);

					// Fetch seller info for each seller ID
					const sellerRequests = sellerIds.map((sellerId) =>
						fetch(`${apiBaseUrl}/users/seller/${sellerId}`).then((res) =>
							res.json()
						)
					);

					// Wait for all seller info requests to complete
					const sellersData = await Promise.all(sellerRequests);
					setSellersInfo(sellersData);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchOrderData();
	}, [orderId]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (!data) {
		return <p>No data available</p>;
	}

	const { items, total_price, transaction_id } = data;

	// Create a map for quick lookup of seller info by seller_id
	const sellerInfoMap = new Map<number, SellerInfo>();
	sellersInfo.forEach((seller) => sellerInfoMap.set(seller.seller_id, seller));

	// Group items by seller_id and calculate total per seller
	const groupedItems = items.reduce((acc, item) => {
		if (!acc[item.seller_id]) {
			acc[item.seller_id] = { items: [], total: 0 };
		}
		acc[item.seller_id].items.push(item);
		acc[item.seller_id].total += parseFloat(item.price) * item.quantity;
		return acc;
	}, {} as Record<number, { items: OrderItem[]; total: number }>);

	return (
		<div className='max-w-3xl mx-auto my-8 p-6 bg-white shadow-md rounded-lg'>
			<h1 className='text-2xl font-bold text-gray-800 mb-4'>
				Instruksi Transfer Bank
			</h1>

			<div className='mb-6'>
				<h2 className='text-2xl font-semibold text-gray-700 mb-4'>
					Rincian Produk
				</h2>
				{Object.entries(groupedItems).map(([sellerId, { items, total }]) => {
					const sellerInfo = sellerInfoMap.get(Number(sellerId));
					return (
						<Card key={sellerId} className='mb-6 border-black'>
							<CardHeader>
								<CardTitle>
									{sellerInfo?.farm_name || "Nama Bisnis Tidak Tersedia"}
								</CardTitle>
								<CardDescription>
									<strong>Nomor Rekening:</strong>{" "}
									{sellerInfo?.account_number || "Loading..."}
								</CardDescription>
							</CardHeader>
							<CardContent>
								{items.map((item) => (
									<div key={item.product_id} className='mb-4'>
										<p className='text-gray-600'>
											<strong>Nama Produk:</strong> {item.product_name}
										</p>
										<p className='text-gray-600'>
											<strong>Harga:</strong> Rp{" "}
											{parseFloat(item.price).toLocaleString("id-ID")}
										</p>
										<p className='text-gray-600'>
											<strong>Jumlah:</strong> {item.quantity}
										</p>
									</div>
								))}
							</CardContent>
							<CardFooter>
								<p className='text-gray-600 font-bold'>
									<strong>Total:</strong> Rp {total.toLocaleString("id-ID")}
								</p>
							</CardFooter>
						</Card>
					);
				})}
			</div>

			<div className='mb-6'>
				<h2 className='text-xl font-semibold text-gray-700'>
					Langkah-langkah Transfer
				</h2>
				<ol className='list-decimal list-inside text-gray-600'>
					<li>Buka aplikasi perbankan atau kunjungi ATM terdekat.</li>
					<li>
						Pilih opsi "Transfer" dan masukkan nomor rekening penjual - penjual
						di atas.
					</li>
					<li>
						Masukkan jumlah sesuai rincian di atas ke nomor rekening sesuai
						setiap produk juga.
					</li>
					<li>
						Pada keterangan, masukkan ID Transaksi:{" "}
						<strong>{transaction_id}</strong>.
					</li>
					<li>Konfirmasi detail transfer dan selesaikan transaksi.</li>
				</ol>
			</div>

			<div className='text-center'>
				<p className='text-gray-700'>
					Setelah transfer berhasil, harap menunggu produsen menyelesaikan dan
					mengirimkan produk anda!
				</p>
				<button
					onClick={() => {
						navigate("/");
					}}
					className='mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600'
				>
					Kembali ke Beranda{" "}
				</button>
			</div>
		</div>
	);
};

export default TransferInstructions;
