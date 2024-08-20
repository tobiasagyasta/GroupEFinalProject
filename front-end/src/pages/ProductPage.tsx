import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCartPlus, FaHeart, FaStar } from "react-icons/fa";
import { Product } from "@/lib/types";
import { apiBaseUrl } from "@/lib/api";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";

const ProductPage = ({ category = "" }) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		fetchProducts();
	}, [currentPage, category]); // Include category in the dependency array

	const fetchProducts = async () => {
		try {
			// Construct query with category if provided
			const categoryQuery = category ? `&category=${category}` : "";
			const response = await fetch(
				`${apiBaseUrl}/product/?page=${currentPage}${categoryQuery}`,
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

	return (
		<div>
			<div className="container mx-auto px-4 py-8">
				<button
					className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
					onClick={() => navigate(-1)}
				>
					Back
				</button>
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

							<button className="w-1/3 mx-auto px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 flex items-center justify-center mt-2">
								<FaHeart className="text-white mr-2" />
								Favorit
							</button>
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
