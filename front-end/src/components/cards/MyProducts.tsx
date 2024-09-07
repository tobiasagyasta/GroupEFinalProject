import React, { useState, useEffect } from "react";
import { apiBaseUrl } from "@/lib/api";
import { Product } from "@/lib/types";
import { fetchCurrentUser } from "@/lib/api";
import { Link } from "react-router-dom";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { debounce } from "lodash";

const MyProducts = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [category, setCategory] = useState("");
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState("price"); // Default to sorting by price
	const [sortOrder, setSortOrder] = useState("desc"); // Default to descending order

	useEffect(() => {
		const fetchUserAndProducts = async () => {
			try {
				const user = await fetchCurrentUser();

				// Construct query parameters for filters and sorting
				const queryParams = new URLSearchParams({
					page: currentPage.toString(),
					per_page: "10",
					category,
					search,
					sort_by: sortBy,
					sort_order: sortOrder,
				}).toString();

				// Fetch products based on filters, sorting, and pagination
				const response = await fetch(
					`${apiBaseUrl}/product/by_user/${user.id}?${queryParams}`,
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
					setTotalPages(Math.ceil(data.total / 10)); // Adjust 10 to per_page
				} else {
					console.error("Failed to fetch products");
				}
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchUserAndProducts();
	}, [currentPage, category, search, sortBy, sortOrder]);

	// Debounced search handler
	const handleSearch = debounce((query: string) => {
		setSearch(query);
		setCurrentPage(1); // Reset to the first page when changing search term
	}, 500);

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className="p-8">
			<h1 className="text-2xl font-semibold mb-4">Daftar Produk</h1>

			{/* Filters */}
			<div className="mb-6 flex flex-wrap gap-4">
				<input
					type="text"
					placeholder="Search..."
					onChange={(e) => handleSearch(e.target.value)}
					className="border px-3 h-11 flex-1"
				/>

				{/* Category Filter */}
				<div className="mb-4 w-1/4">
					<select
						value={category}
						aria-placeholder="Categories"
						onChange={(e) => {
							setCategory(e.target.value);
							setCurrentPage(1); // Reset to the first page when changing category
						}}
						className="px-4 py-2 border border-gray-300 rounded-lg w-full"
					>
						<option value="">All Categories</option>
						<option value="Sayuran">Sayuran</option>
						<option value="Buah">Buah</option>
						<option value="Kacang">Kacang</option>
						<option value="Rempah">Rempah</option>
						<option value="Snacks">Snacks</option>
					</select>
				</div>

				{/* Sort by Price Dropdown */}
				<div className="mb-4 w-1/4">
					<select
						value={sortBy}
						onChange={(e) => {
							setSortBy(e.target.value);
							setCurrentPage(1); // Reset to the first page when changing sort field
						}}
						className="px-4 py-2 border border-gray-300 rounded-lg w-full"
					>
						<option value="price">Sort by Price</option>
						<option value="quantity">Sort by Quantity</option>
					</select>
				</div>

				{/* Sort Order Dropdown */}
				<div className="mb-4 w-1/4">
					<select
						value={sortOrder}
						onChange={(e) => {
							setSortOrder(e.target.value);
							setCurrentPage(1); // Reset to the first page when changing sort order
						}}
						className="px-4 py-2 border border-gray-300 rounded-lg w-full"
					>
						<option value="desc">Descending</option>
						<option value="asc">Ascending</option>
					</select>
				</div>
			</div>

			{/* Product List */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{products.map((product) => (
					<div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
						<img
							src={`${apiBaseUrl}/uploads/products/${product.product_picture_url}`}
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
						<p className="text-lg font-semibold mb-2">
							Quantity : {product.quantity}
						</p>
						<Link to={`/product/${product.id}`}>
							<button className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600">
								Lihat produk
							</button>
						</Link>
					</div>
				))}
			</div>

			{/* Pagination */}
			<div className="flex justify-center mt-8 text-2xl">
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href="#"
								onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
							/>
						</PaginationItem>

						{Array.from({ length: totalPages }, (_, index) => (
							<PaginationItem key={index + 1}>
								<PaginationLink
									href="#"
									onClick={() => handlePageChange(index + 1)}
								>
									{index + 1}
								</PaginationLink>
							</PaginationItem>
						))}

						<PaginationItem>
							<PaginationNext
								href="#"
								onClick={() =>
									handlePageChange(Math.min(currentPage + 1, totalPages))
								}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
};

export default MyProducts;
