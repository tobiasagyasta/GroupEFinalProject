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

const MyProducts = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const fetchUserAndProducts = async () => {
			try {
				const user = await fetchCurrentUser();

				// Fetch products based on the currentPage
				const response = await fetch(
					`${apiBaseUrl}/product/by_user/${user.id}?page=${currentPage}&per_page=10`, // Adjust per_page if needed
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
	}, [currentPage]); // Depend on currentPage to refetch products when page changes

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className="p-8">
			<h1 className="text-2xl font-semibold mb-4">Daftar Produk</h1>
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
						<Link to={`/product/${product.id}`}>
							<button className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600">
								Lihat produk
							</button>
						</Link>
					</div>
				))}
			</div>
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
