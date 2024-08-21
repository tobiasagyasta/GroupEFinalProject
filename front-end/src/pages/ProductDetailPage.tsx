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
	const [quantity, setQuantity] = useState<number>(1); // State for product quantity
	const [buyerId, setBuyerId] = useState<number | null>(null);
	const [cartId, setCartId] = useState<number | null>(null); // State for cart ID

	useEffect(() => {
		const fetchUser = async () => {
			const currentUser = await fetchCurrentUser();
			setUser(currentUser);
			// Fetch buyer id
			if (currentUser && currentUser.role === "buyer") {
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

	useEffect(() => {
		const fetchOrCreateCart = async () => {
			if (buyerId) {
				try {
					// Check if the user already has a cart
					let cartResponse = await fetch(
						`${apiBaseUrl}/cart/buyer/${buyerId}`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
							},
							credentials: "include",
						}
					);
					let cartData = await cartResponse.json();
					// If no cart exists, create one
					if (!cartData || !cartData.id) {
						const createCartResponse = await fetch(
							`${apiBaseUrl}/cart/create`,
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								credentials: "include",
							}
						);
						if (!createCartResponse.ok) {
							throw new Error("Failed to create cart");
						}
						cartData = await createCartResponse.json();
					}
					setCartId(cartData.id);
				} catch (error) {
					console.error("Error fetching or creating cart:", error);
				}
			}
		};

		fetchOrCreateCart();
	}, [buyerId]);

	const handleQuantityChange = (delta: number) => {
		setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
	};

	const handleAddToCart = async () => {
		if (!user) {
			console.error("User is not logged in.");
			return;
		}

		if (!cartId) {
			console.error("Cart ID is not available.");
			return;
		}

		try {
			// Add item to the cart
			const addItemResponse = await fetch(
				`${apiBaseUrl}/cart/${cartId}/items`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						product_id: id,
						quantity,
					}),
					credentials: "include",
				}
			);
			if (!addItemResponse.ok) {
				throw new Error("Failed to add item to cart");
			}
			console.log("Item added to cart");
		} catch (error) {
			console.error("Error managing cart:", error);
		}
	};

	const handleBuyNow = () => {
		// Logic to handle buying the product instantly
		console.log("Buy now", { productId: id, quantity });
	};

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
								<h1 className='text-lg font-bold'>Order sekarang!</h1>
								<div className='flex items-center text-center space-x-4 mt-4'>
									<button
										onClick={() => handleQuantityChange(-1)}
										className='px-2 py-1 bg-green-200 rounded-md'
									>
										-
									</button>
									<span>{quantity}</span>
									<button
										onClick={() => handleQuantityChange(1)}
										className='px-2 py-1 bg-green-200 rounded-md'
									>
										+
									</button>
								</div>
								<p className='text-lg font-bold mt-4'>
									Total: Rp {(product.price * quantity).toLocaleString()}
								</p>
								<div className='flex justify-start space-x-4 mt-4'>
									<button
										onClick={handleAddToCart}
										className='bg-green-700 p-2 text-white rounded-lg hover:bg-green-800'
									>
										Add to Cart
									</button>
									<button
										onClick={handleBuyNow}
										className='bg-blue-700 p-2 text-white rounded-lg hover:bg-blue-800'
									>
										Buy Now
									</button>
								</div>
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
