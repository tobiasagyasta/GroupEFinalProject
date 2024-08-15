import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "@/lib/types";
import { apiBaseUrl } from "@/lib/api";

function ProductDetailPage() {
	const { id } = useParams(); // Get the product ID from the URL
	const [product, setProduct] = useState<Product | null>(null);

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
			} catch (error) {
				console.error("Error fetching product:", error);
			}
		}

		fetchProduct();
	}, [id]);

	if (!product) return <div>Loading...</div>;

	return (
		<div className='min-h-screen p-8'>
			<div className='container mx-auto'>
				<div className='flex flex-col md:flex-row'>
					<img
						src={`${apiBaseUrl}/uploads/products/${product.product_picture_url}`}
						alt={product.name}
						className='w-full md:w-1/2 h-64 object-cover mb-4 md:mb-0'
					/>
					<div className='md:ml-8 flex flex-col'>
						<h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
						<p className='text-lg mb-4'>
							Price: Rp {product.price.toLocaleString()}
						</p>
						<p className='text-gray-700 mb-4'>{product.description}</p>
						<p className='text-gray-500'>Category: {product.category}</p>
						<p className='text-gray-500'>Stock: {product.quantity}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductDetailPage;
