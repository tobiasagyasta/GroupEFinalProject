import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCartPlus, FaHeart, FaStar } from "react-icons/fa";
import { Product } from "@/lib/types";
import { apiBaseUrl } from "@/lib/api";

const ProductDetailPage = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [isCheckoutDialogOpen, setCheckoutDialogOpen] = useState(false);
	const [productReviews, setProductReviews] = useState<any[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchProducts();
		fetchProductReviews();
	}, [currentPage]);

	const fetchProducts = async () => {
		try {
			const response = await fetch(
				`${apiBaseUrl}/product/?page=${currentPage}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.ok) {
				const data = await response.json();
				setProducts(data.products);
				setTotalPages(Math.ceil(data.total / data.per_page));
			} else {
				console.error("Failed to fetch products");
			}
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	const fetchProductReviews = async () => {
		// Assuming there's an endpoint for fetching reviews for a specific product
		try {
			const response = await fetch(`/reviews`);
			if (response.ok) {
				const data = await response.json();
				setProductReviews(data);
			} else {
				console.error("Failed to fetch product reviews");
			}
		} catch (error) {
			console.error("Error fetching product reviews:", error);
		}
	};

	const handleQuantityChange = (productId: number, change: number) => {
		setProducts((prevProducts) =>
			prevProducts.map((product) =>
				product.id === productId
					? {
							...product,
							quantity:
								product.quantity + change > 0
									? Math.min(product.quantity + change, 10)
									: 1,
					  }
					: product
			)
		);
	};

	const handleViewAllReviews = () => {
		navigate(`/review`);
	};

	const handleOpenCheckoutDialog = () => setCheckoutDialogOpen(true);
	const handleCloseCheckoutDialog = () => setCheckoutDialogOpen(false);

	const rupiahFormatter = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	});

	return (
		<div>
			<div className='container mx-auto px-4 py-8'>
				<button
					className='mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600'
					onClick={() => navigate(-1)}
				>
					Back
				</button>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{products.map((product) => (
						<div key={product.id} className='bg-white p-4 rounded-lg shadow-md'>
							<img
								src={`${apiBaseUrl}/uploads/products/${product?.product_picture_url}`}
								alt={product.name}
								className='w-full h-48 object-cover rounded-lg mb-4'
							/>
							<h2 className='text-xl font-bold mb-2'>{product.name}</h2>
							<p className='text-lg font-semibold mb-2'>
								{rupiahFormatter.format(product.price)} / {product.unit}
							</p>
							<p className='mb-2'>Rating: 4.5</p>
							<div className='flex items-center space-x-4 mt-4'>
								<button
									onClick={() => handleQuantityChange(product.id, -1)}
									className='px-4 py-2 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400'
								>
									-
								</button>
								<input
									type='number'
									value={product.quantity}
									readOnly
									className='w-16 text-center border border-gray-300 rounded-lg'
								/>
								<button
									onClick={() => handleQuantityChange(product.id, 1)}
									className='px-4 py-2 bg-gray-300 text-black rounded-lg shadow-md hover:bg-gray-400'
								>
									+
								</button>
							</div>
							<p className='text-xl font-semibold mb-4 mt-4'>
								Harga Total:{" "}
								{rupiahFormatter.format(product.price * product.quantity)}
							</p>
							<button
								onClick={handleOpenCheckoutDialog}
								className='w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 flex items-center justify-center'
							>
								Beli Langsung
							</button>
							<button
								className='w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 flex items-center justify-center mt-2'
								onClick={() => {}}
							>
								<FaCartPlus className='text-white mr-2' />
								Keranjang
							</button>
							<button
								className='w-full px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 flex items-center justify-center mt-2'
								onClick={() => {}}
							>
								<FaHeart className='text-white mr-2' />
								Favorit
							</button>
						</div>
					))}
				</div>
				{/* <div className='mt-8'>
					<h3 className='text-2xl font-semibold mb-4'>Review Pembeli</h3>
					{productReviews.length > 0 ? (
						<div>
							{productReviews.map((review) => (
								<div
									key={review.id}
									className='flex items-start mb-4 p-4 bg-white rounded-lg shadow-md cursor-pointer'
								>
									<div className='w-16 h-16 mr-4'>
										<img
											src={review.image}
											alt={`Review ${review.id}`}
											className='w-full h-full object-cover rounded-md'
										/>
									</div>
									<div>
										<p className='text-lg font-semibold mb-1'>
											{review.reviewerName}
										</p>
										<p className='text-lg mb-1'>
											<FaStar className='inline text-yellow-500' />{" "}
											{review.rating} / 5
										</p>
										<p className='text-sm'>{review.comment}</p>
									</div>
								</div>
							))}
							<button
								onClick={handleViewAllReviews}
								className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600'
							>
								View All Reviews
							</button>
						</div>
					) : (
						<p>No reviews available.</p>
					)}
				</div> */}
			</div>
		</div>
	);
};

export default ProductDetailPage;
