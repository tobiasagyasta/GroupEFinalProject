import { useEffect, useState } from "react";
import { apiBaseUrl, fetchCurrentUser } from "@/lib/api";
import { User } from "@/lib/types";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface FavoriteProduct {
	product_id: number;
	product_name: string;
	price: string;
	product_picture_url: string;
}

const LikesByUser = () => {
	const [user, setUser] = useState<User>();
	const [favoritedProducts, setFavoritedProducts] = useState<FavoriteProduct[]>(
		[]
	);

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

	// Function to unfavorite a product
	const handleUnfavorite = async (productId: number) => {
		try {
			// Show a confirmation
			// eslint-disable-next-line no-restricted-globals
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
					// Update state to remove the unfavorited product
					setFavoritedProducts((prev) =>
						prev.filter((product) => product.product_id !== productId)
					);
				} else {
					console.error("Failed to remove product from favorites");
				}
			}
		} catch (error) {
			console.error("Error removing from favorites:", error);
		}
	};

	const fetchFavorites = async () => {
		try {
			const response = await fetch(`${apiBaseUrl}/favorites/${user?.id}`, {
				method: "GET",
				credentials: "include",
			});

			if (response.ok) {
				const data = await response.json();
				if (Array.isArray(data)) {
					setFavoritedProducts(data);
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

	return (
		<div>
			<h2>Liked Products</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{favoritedProducts.map((product) => (
					<div key={product.product_id} className='border p-4 rounded-lg'>
						<img
							src={`${apiBaseUrl}/uploads/products/${product.product_picture_url}`}
							alt={product.product_name}
							className='w-full h-48 object-cover rounded-lg mb-4'
						/>
						<h3 className='text-xl font-semibold'>{product.product_name}</h3>
						<p className='text-lg font-medium text-gray-700'>
							Price: Rp {Number(product.price).toLocaleString("id-ID")}
						</p>
						<Link to={`/product/${product.product_id}`}>
							<Button>Lihat Product</Button>
						</Link>
						<Button
							variant='destructive'
							onClick={() => handleUnfavorite(product.product_id)}
						>
							Unfavorite Product
						</Button>
					</div>
				))}
			</div>
		</div>
	);
};

export default LikesByUser;
