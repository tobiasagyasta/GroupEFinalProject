import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ShoppingCart from "./ShoppingCart";
import { apiBaseUrl, fetchCurrentUser } from "@/lib/api";
import { User } from "@/lib/types";

interface CartItem {
	cart_item_id: number;
	product_id: number;
	quantity: number;
}
interface CartData {
	cart_id: number;
	buyer_id: number;
	created_at: string;
	updated_at: string;
	items: CartItem[];
}

interface ShoppingCartIconProps {
	isOpen: boolean;
	toggleCart: () => void;
}

const ShoppingCartIcon: React.FC<ShoppingCartIconProps> = ({
	isOpen,
	toggleCart,
}) => {
	const [isCartOpen, setIsCartOpen] = useState(isOpen);
	const [cartId, setCartId] = useState<string>();
	const [cart, setCart] = useState<CartData | null>(null); // State to hold cart items
	const [user, setUser] = useState<User | null>(null);
	const [buyerId, setBuyerId] = useState<number | null>(null);

	const handleToggleCart = async () => {
		setIsCartOpen(!isCartOpen);
		if (!isCartOpen) {
			// Only fetch data when the cart is opened
			await fetchCartData();
		}
		toggleCart();
	};

	useEffect(() => {
		const fetchUser = async () => {
			const currentUser = await fetchCurrentUser();
			setUser(currentUser);
			if (currentUser) {
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

	const fetchCartData = async () => {
		try {
			if (buyerId) {
				const response = await fetch(`${apiBaseUrl}/cart/buyer/${buyerId}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
				});
				if (!response.ok) {
					throw new Error("Failed to fetch cart id");
				}
				const data = await response.json();
				setCartId(data.cart_id);
			}
			if (cartId) {
				const response = await fetch(`${apiBaseUrl}/cart/${cartId}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
				});
				if (!response.ok) {
					throw new Error("Failed to fetch cart data");
				}
				const data = await response.json();
				setCart(data);
			}
		} catch (error) {
			console.error("Error fetching cart:", error);
		}
	};

	return (
		<div className='relative'>
			<button
				onClick={handleToggleCart}
				className='text-green-700 hover:text-green-900'
			>
				<FaShoppingCart className='w-6 h-6 mt-1' />
			</button>

			<ShoppingCart
				isOpen={isCartOpen}
				toggleCart={handleToggleCart}
				activeTab='cart'
				cartData={cart} // Pass the fetched items to ShoppingCart
			/>
		</div>
	);
};

export default ShoppingCartIcon;
