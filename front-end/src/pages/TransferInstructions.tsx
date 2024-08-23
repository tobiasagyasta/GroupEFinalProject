import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "@/lib/api";

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

const TransferInstructions: React.FC = () => {
	const { orderId } = useParams<{ orderId: string }>();
	const [data, setData] = useState<TransferInstructionsData | null>(null);
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

	const { items, total_price, transaction_id, payment_method } = data;

	return (
		<div className='max-w-3xl mx-auto my-8 p-6 bg-white shadow-md rounded-lg'>
			<h1 className='text-2xl font-bold text-gray-800 mb-4'>
				Instruksi Transfer Bank
			</h1>

			<div className='mb-6'>
				<h2 className='text-xl font-semibold text-gray-700'>Rincian Produk</h2>
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
							<strong>ID Transaksi:</strong> {transaction_id}
						</p>
					</div>
				))}
			</div>

			<div className='mb-6'>
				<h2 className='text-xl font-semibold text-gray-700'>
					Nomor Rekening Penjual
				</h2>
				{/* Display seller bank account info (assuming you have this data) */}
				<p className='text-gray-600 text-lg font-mono'>
					{/* Bank account info should be fetched from seller data */}
				</p>
			</div>

			<div className='mb-6'>
				<h2 className='text-xl font-semibold text-gray-700'>
					Langkah-langkah Transfer
				</h2>
				<ol className='list-decimal list-inside text-gray-600'>
					<li>Buka aplikasi perbankan atau kunjungi ATM terdekat.</li>
					<li>
						Pilih opsi "Transfer" dan masukkan nomor rekening penjual di atas.
					</li>
					<li>
						Masukkan jumlah sebesar{" "}
						<strong>
							Rp {parseFloat(total_price).toLocaleString("id-ID")}
						</strong>
						.
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
					Setelah transfer berhasil, harap konfirmasi pembayaran Anda melalui
					halaman konfirmasi di situs kami.
				</p>
				<button className='mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600'>
					Konfirmasi Pembayaran
				</button>
			</div>
		</div>
	);
};

export default TransferInstructions;
