import React, { useEffect, useState } from "react";
import { Product } from "@/lib/types";

import { Link } from "react-router-dom";
import { apiBaseUrl } from "@/lib/api";

function ProductPageTest() {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		async function fetchProducts() {
			try {
				const response = await fetch(`${apiBaseUrl}/product/`, {
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
				setProducts(data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		}

		fetchProducts();
	}, []);

	return (
		<div className='min-h-screen'>
			{/* Navbar */}
			{/* ... */}

			{/* Product Grid */}
			<div className='container mx-auto p-8'>
				<div className='flex justify-between items-center mb-4'>
					<h1 className='text-2xl font-bold'>Produk Sayuran</h1>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
					{products.map((product) => (
						<Link
							key={product.id}
							to={`/product/${product.id}`}
							className='bg-white p-4 rounded shadow'
						>
							<img
								src={`${apiBaseUrl}/uploads/products/${product.product_picture_url}`}
								alt={product.name}
								className='w-full h-32 object-cover mb-4'
							/>
							<div className='text-lg font-semibold'>
								Rp {product.price.toLocaleString()}
							</div>
							<div className='text-gray-600'>{product.name}</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

export default ProductPageTest;
