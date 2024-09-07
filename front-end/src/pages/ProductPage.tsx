/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { Product } from "@/lib/types";
import { apiBaseUrl, fetchCurrentUser } from "@/lib/api";
import { User } from "@/lib/types";
import { debounce } from "lodash";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";

const ProductPage = ({ category = "" }) => {
	const [user, setUser] = useState<User>();
	const [products, setProducts] = useState<Product[]>([]);
	const [favoritedProducts, setFavoritedProducts] = useState<number[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState(category);
	const [sortOrder, setSortOrder] = useState<string>("desc");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			const currentUser = await fetchCurrentUser();
			setUser(currentUser);
		};
		fetchUser();
	}, []);

	useEffect(() => {
		if (user?.role === "buyer") {
			fetchFavorites();
		}
	}, [user]);

	useEffect(() => {
		fetchProducts();
	}, [currentPage, selectedCategory, searchTerm, sortOrder]);

	const fetchFavorites = async () => {
		try {
			const response = await fetch(`${apiBaseUrl}/favorites/${user?.id}`, {
				method: "GET",
				credentials: "include",
			});

			if (response.ok) {
				const data = await response.json();
				if (Array.isArray(data)) {
					setFavoritedProducts(
						data.map((fav: { product_id: number }) => fav.product_id)
					);
				} else {
					setFavoritedProducts([]);
				}
			} else {
				console.error("Failed to fetch favorites");
				setFavoritedProducts([]);
			}
		} catch (error) {
			console.error("Error fetching favorites:", error);
			setFavoritedProducts([]);
		}
	};

	const fetchProducts = async () => {
		try {
			const categoryQuery = selectedCategory
				? `&category=${selectedCategory}`
				: "";
			const searchQuery = searchTerm ? `&search=${searchTerm}` : "";
			const response = await fetch(
				`${apiBaseUrl}/product/?page=${currentPage}${categoryQuery}${searchQuery}&sort_order=${sortOrder}`,
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

	const handleFavoriteToggle = async (productId: number) => {
		try {
			if (favoritedProducts.includes(productId)) {
				await handleUnfavorite(productId);
			} else {
				await handleFavorite(productId);
			}
		} catch (error) {
			console.error("Error toggling favorite:", error);
		}
	};

	const handleFavorite = async (product_id: number) => {
		if (!user) {
			console.error("User must be logged in to add favorites");
			return;
		}

		try {
			const response = await fetch(`${apiBaseUrl}/favorites/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					product_id,
					user_id: user.id,
				}),
				credentials: "include",
			});

			if (response.ok) {
				setFavoritedProducts([...favoritedProducts, product_id]);
			} else if (response.status === 409) {
				console.log("Product is already in favorites");
			} else {
				console.error("Failed to add product to favorites");
			}
		} catch (error) {
			console.error("Error adding product to favorites:", error);
		}
	};

	const handleUnfavorite = async (productId: number) => {
		try {
			let confirmed = confirm("Apakah anda mau delete favorite produk ini?");
			if (confirmed) {
				const response = await fetch(`${apiBaseUrl}/favorites/${productId}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
				});

				if (response.ok) {
					setFavoritedProducts((prev) => prev.filter((id) => id !== productId));
				} else {
					console.error("Failed to remove product from favorites");
				}
			}
		} catch (error) {
			console.error("Error removing from favorites:", error);
		}
	};

	// Debounced search handler
	const handleSearch = debounce((query: string) => {
		setSearchTerm(query);
	}, 500);

	return (
		<div>
			<div className="container mx-auto px-4 py-8">
				{/* Search Bar */}
				<div className="mb-4">
					<input
						type="text"
						placeholder="Search products..."
						onChange={(e) => handleSearch(e.target.value)}
						className="px-4 py-2 border border-gray-300 rounded-lg w-full"
					/>
				</div>

				{/* Category Filter */}
				<div className="mb-4 w-1/4">
					<select
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
						className="px-4 py-2 border border-gray-300 rounded-lg w-full"
					>
						<option value="">All Categories</option>
						{/* Add more category options here */}
						<option value="Sayuran">Sayuran</option>
						<option value="Buah">Buah</option>
						<option value="Kacang">Kacang</option>
						<option value="Rempah">Rempah</option>
						<option value="Snacks">Snacks</option>
					</select>
				</div>

				{/* Sort by Price Dropdown */}
				<div className="mb-4">
					<label htmlFor="sortOrder" className="mr-2">
						Sort by Price:
					</label>
					<select
						id="sortOrder"
						value={sortOrder}
						onChange={(e) => {
							setSortOrder(e.target.value);
							setCurrentPage(1); // Reset to the first page when changing sort order
						}}
						className="border border-gray-300 rounded-md px-3 py-2"
					>
						<option value="desc">Price: High to Low</option>
						<option value="asc">Price: Low to High</option>
					</select>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
					{products.map((product) => (
						<div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
							<img
								src={`${apiBaseUrl}/uploads/products/${product?.product_picture_url}`}
								alt={product.name}
								className="w-full h-48 object-cover rounded-lg mb-4"
							/>
							<h2 className="text-xl font-bold mb-2">{product.name}</h2>
							<p className="text-lg font-semibold mb-2">
								{new Intl.NumberFormat("id-ID", {
									style: "currency",
									currency: "IDR",
									minimumFractionDigits: 0,
								}).format(product.price)}{" "}
								/ {product.unit}
							</p>
							<Link to={`/product/${product.id}`}>
								<button className="w-1/3 mx-auto px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 flex items-center justify-center mt-2">
									Lihat produk
								</button>
							</Link>
							{user?.role === "buyer" && (
								<button
									onClick={() => handleFavoriteToggle(product.id)}
									className="w-1/3 mx-auto px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 flex items-center justify-center mt-2"
								>
									<FaHeart
										className={`${
											favoritedProducts.includes(product.id)
												? "text-red-500"
												: "text-white"
										} mr-2`}
									/>
									Favorit
								</button>
							)}
						</div>
					))}
				</div>
				<div className="flex justify-center mt-8 text-2xl">
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href="#"
									onClick={() =>
										setCurrentPage((prev) => Math.max(prev - 1, 1))
									}
								/>
							</PaginationItem>

							{Array.from({ length: totalPages }, (_, index) => (
								<PaginationItem key={index}>
									<PaginationLink
										href="#"
										onClick={() => setCurrentPage(index + 1)}
									>
										{index + 1}
									</PaginationLink>
								</PaginationItem>
							))}

							<PaginationItem>
								<PaginationNext
									href="#"
									onClick={() =>
										setCurrentPage((prev) => Math.min(prev + 1, totalPages))
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
