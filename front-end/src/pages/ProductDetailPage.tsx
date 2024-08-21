import React, { useEffect, useState } from "react";
import ReviewsList from "@/components/cards/ReviewsList";
import { useParams } from "react-router-dom";
import { Product } from "@/lib/types";
import { apiBaseUrl, fetchCurrentUser } from "@/lib/api";
import { User } from "@/lib/types";
import ReviewsCard from "@/components/cards/ReviewsCard";

function ProductDetailPage() {
	const { id } = useParams(); // Get the product ID from the URL
	const [product, setProduct] = useState<Product | null>(null);
	const [seller, setSeller] = useState<any>(null); // Define a state for seller information
	const [selectedImage, setSelectedImage] = useState<string>("");
	const [user, setUser] = useState<User | null>(null);
	const [reviews, setReviews] = useState<any[]>([]); // State for reviews

	useEffect(() => {
		const fetchUser = async () => {
			const currentUser = await fetchCurrentUser();
			setUser(currentUser);
		};
		fetchUser();
	}, []);

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
				setSelectedImage(
					`${apiBaseUrl}/uploads/products/${data.product_picture_url}`
				);

				// Fetch seller information
				const sellerResponse = await fetch(
					`${apiBaseUrl}/product/${id}/seller`,
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

				// Fetch reviews
				const reviewsResponse = await fetch(
					`${apiBaseUrl}/review/product/${id}`
				);
				if (!reviewsResponse.ok) {
					throw new Error("Network response was not ok");
				}
				const reviewsData = await reviewsResponse.json();
				setReviews(reviewsData);
			} catch (error) {
				console.error("Error fetching product, seller, or reviews:", error);
			}
		}

		fetchProduct();
	}, [id]);

	if (!product) return <div>Loading...</div>;

	return (
		<div className='min-h-screen p-8'>
			<div className='container mx-auto'>
				<div className='flex flex-col md:flex-row'>
					{/* Product Image and Additional Images */}
					<div className='flex-1 '>
						<img
							src={selectedImage}
							alt={product.name}
							className='w-[75%] max-w-4xl mx-auto mb-4 rounded-lg shadow-md'
						/>
						<div className='flex space-x-2 mt-4'>
							{product.product_picture_url && (
								<img
									src={`${apiBaseUrl}/uploads/products/${product.product_picture_url}`}
									alt={`${product.name}`}
									onClick={() =>
										setSelectedImage(
											`${apiBaseUrl}/uploads/products/${product.product_picture_url}`
										)
									}
									className='w-16 h-16 object-cover rounded-lg shadow-md cursor-pointer hover:opacity-75'
								/>
							)}
							{/* Additional images can be handled similarly */}
						</div>
					</div>

					{/* Product Details and Reviews */}
					<div className='flex-1 flex flex-col'>
						<div className='flex flex-col md:flex-row'>
							<div className='md:w-2/3 pr-8'>
								<h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
								<p className='text-lg mb-4'>
									Price: Rp {product.price.toLocaleString()} / {product.unit}
								</p>
								<p className='text-gray-700 mb-4'>{product.description}</p>
								<p className='text-gray-500'>Category: {product.category}</p>
							</div>
							<div className='md:w-1/3'>
								{/* Render reviews */}
								{reviews.length > 0 && (
									<div>
										<h2 className='text-2xl font-bold mb-4'>Reviews</h2>
										<ReviewsList reviews={reviews} />
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Seller Information */}
				<div className='mt-8 p-4 border-t border-gray-200 text-left'>
					<div className='mt-4 flex flex-row justify-center gap-x-12 items-center'>
						<div className='flex flex-row'>
							{seller && seller.profile_picture_url ? (
								<img
									src={`${apiBaseUrl}/uploads/${seller.profile_picture_url}`}
									alt={`Profile picture of ${seller.user_name}`}
									className='w-32 h-32 object-cover rounded-2xl mr-10'
								/>
							) : (
								<div className='w-32 h-32 bg-gray-200 rounded-2xl mr-10'></div>
							)}

							<div>
								<h2 className='text-xl font-semibold mb-2'>
									Seller Information
								</h2>
								{seller ? (
									<>
										<p>
											<strong>Nama Petani:</strong> {seller.user_name}
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
											<strong>Contact:</strong> {seller.user_phone}
										</p>
										<p>
											<strong>Email :</strong> {seller.user_email}
										</p>
									</>
								) : (
									<p>Seller information is not available.</p>
								)}
							</div>
						</div>
						{user?.role === "buyer" && id && <ReviewsCard product_id={id} />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductDetailPage;
