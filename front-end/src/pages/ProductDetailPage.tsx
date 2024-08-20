import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "@/lib/types";
import { apiBaseUrl } from "@/lib/api";

function ProductDetailPage() {
	const { id } = useParams(); // Get the product ID from the URL
	const [product, setProduct] = useState<Product | null>(null);
	const [seller, setSeller] = useState<any>(null); // Define a state for seller information

	useEffect(() => {
		async function fetchProduct() {
			try {
				const response = await fetch(`${apiBaseUrl}/product/${id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
				});
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setProduct(data);

				// Fetch seller information
				const sellerResponse = await fetch(
					`${apiBaseUrl}/users/sellers/${data.seller_id}/`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (!sellerResponse.ok) {
					throw new Error("Network response was not ok");
				}
				const sellerData = await sellerResponse.json();
				setSeller(sellerData);
			} catch (error) {
				console.error("Error fetching product or seller:", error);
			}
		}

		fetchProduct();
	}, [id]);

	if (!product) return <div>Loading...</div>;

	return (
		<div className="min-h-screen p-8">
			<div className="container mx-auto">
				<div className="flex flex-col md:flex-row">
					<img
						src={`${apiBaseUrl}/uploads/products/${product.product_picture_url}`}
						alt={product.name}
						className="w-full md:w-1/2 h-64 object-cover mb-4 md:mb-0"
					/>
					<div className="md:ml-8 flex flex-col">
						<h1 className="text-3xl font-bold mb-4">{product.name}</h1>
						<p className="text-lg mb-4">
							Price: Rp {product.price.toLocaleString()}
						</p>
						<p className="text-gray-700 mb-4">{product.description}</p>
						<p className="text-gray-500">Category: {product.category}</p>
						<p className="text-gray-500">Stock: {product.quantity}</p>
					</div>
				</div>
				{seller && (
					<>
						<div className="mt-8 p-4 border-t border-gray-200 text-left">
							<div className="flex flex-row justify-left items-center">
								{seller.user.profile_picture_url && (
									<img
										src={`${apiBaseUrl}/uploads/${seller.user.profile_picture_url}`}
										alt={`Profile picture of ${seller.user.name}`}
										className="w-32 h-32 object-cover rounded-2xl mr-10"
									/>
								)}
								<div>
									<h2 className="text-xl font-semibold mb-2">
										Seller Information
									</h2>

									<p>
										<strong>Nama Petani:</strong> {seller.user.name}
									</p>
									<p>
										<strong>Nama Sawah :</strong> {seller.farm_name}
									</p>
									<p>
										<strong>Lokasi Sawah:</strong> {seller.farm_location}
									</p>
									<p>
										<strong>Bio:</strong> {seller.bio}
									</p>
									<p>
										<strong>Contact:</strong> {seller.user.phone_number}
									</p>
									<p>
										<strong>Email :</strong> {seller.user.email}
									</p>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default ProductDetailPage;
