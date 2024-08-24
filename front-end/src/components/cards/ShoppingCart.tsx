import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { apiBaseUrl } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

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

interface Product {
	id: number;
	seller_id: number;
	name: string;
	category: string;
	description: string;
	price: number;
	quantity: number;
	unit: string;
	status: string;
	product_picture_url: string;
	created_at: string;
	time_updated: string | null;
}

interface ShoppingCartProps {
	isOpen: boolean;
	toggleCart: () => void;
	activeTab: string;
	cartData: CartData | null;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
	isOpen,
	toggleCart,
	activeTab,
	cartData,
}) => {
	const [items, setItems] = useState<Product[]>([]);
	const cartRef = useRef<HTMLDivElement>(null);
	const { toast } = useToast();
	const navigate = useNavigate();

	useEffect(() => {
		if (cartData) {
			const fetchProductData = async () => {
				const productRequests = cartData.items.map((item) =>
					fetch(`${apiBaseUrl}/product/${item.product_id}`)
						.then((response) => response.json())
						.then((data) => ({ ...data, quantity: item.quantity }))
				);

				const products = await Promise.all(productRequests);
				setItems(products);
			};

			fetchProductData();
		}
	}, [cartData]);

	useEffect(() => {
		if (activeTab !== "cart" && isOpen) {
			toggleCart();
		}
	}, [activeTab, isOpen, toggleCart]);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
				toggleCart();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [toggleCart]);

	const handleQuantityChange = (productId: number, change: number) => {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === productId
					? { ...item, quantity: Math.max(1, item.quantity + change) } // Ensure quantity is at least 1
					: item
			)
		);
	};
	const handleCheckout = async () => {
		if (cartData) {
			try {
				// Update the cart items
				const updateResponse = await fetch(
					`${apiBaseUrl}/cart/${cartData.cart_id}/update_items`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							items: items.map((item) => ({
								product_id: item.id,
								quantity: item.quantity,
							})),
						}),
					}
				);

				if (updateResponse.ok) {
					console.log("Cart items updated successfully.");

					// Create the order
					const createOrderResponse = await fetch(
						`${apiBaseUrl}/order/checkout`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								cart_id: cartData.cart_id,
								buyer_id: cartData.buyer_id, // Assuming you have buyer_id in cartData
								payment_method: "bank_transfer", // You can modify this to use a selected payment method
							}),
						}
					);

					if (createOrderResponse.ok) {
						const data = await createOrderResponse.json();
						console.log("Order created successfully:", data);
						setItems([]);

						toast({
							title: "Pesanan diterima!",
							description: `Membawa anda ke checkout page...`,
							className: "bg-green-500",
						});
						setTimeout(() => {
							navigate(`/checkout/${data.order_id}`);
						}, 3000);
					} else {
						console.error(
							"Failed to create order:",
							createOrderResponse.statusText
						);
					}
				} else {
					console.error("Failed to update cart items during checkout.");
				}
			} catch (error) {
				console.error("Error during checkout:", error);
			}
		}
	};

	const handleRemoveItem = async (productId: number) => {
		if (cartData) {
			try {
				await fetch(
					`${apiBaseUrl}/cart/${cartData.cart_id}/remove_item/${productId}`,
					{
						method: "DELETE",
					}
				);

				setItems((prevItems) =>
					prevItems.filter((item) => item.id !== productId)
				);
			} catch (error) {
				console.error("Error removing item from cart:", error);
			}
		}
	};

	const handleRemoveAllItems = async () => {
		if (cartData) {
			try {
				await fetch(`${apiBaseUrl}/cart/${cartData.cart_id}`, {
					method: "DELETE",
				});

				// Clear items from state
				setItems([]);
				// Optionally, you can call toggleCart() or other actions after clearing the cart
				toggleCart();
			} catch (error) {
				console.error("Error removing all items from cart:", error);
			}
		}
	};

	if (!isOpen) return null;

	return (
		<div
			ref={cartRef}
			className="fixed top-0 right-0 w-96 max-h-screen shadow-lg rounded-lg z-40 bg-white overflow-y-auto"
		>
			<div className="p-4 border-b flex items-center justify-between bg-green-700 text-white">
				<h2 className="text-lg font-semibold">Shopping Cart</h2>
				<button onClick={toggleCart} className="text-white hover:text-gray-200">
					<FaShoppingCart className="w-6 h-6" />
				</button>
			</div>
			<div className="p-4">
				{/* Button to Remove All Items */}
				<div className="flex items-center space-x-2 mb-4">
					<button
						onClick={handleRemoveAllItems}
						className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
					>
						Clear Cart
					</button>
				</div>
				<ul className="space-y-4">
					{items.map((item) => (
						<li
							key={item.id}
							className="flex items-start space-x-4 border-b pb-4"
						>
							<div className="flex items-center space-x-4 w-full">
								<img
									src={`${apiBaseUrl}/uploads/products/${item.product_picture_url}`}
									alt={item.name}
									className="w-16 h-16 object-cover rounded-md"
								/>

								<div className="flex-grow">
									<h3 className="text-sm font-medium">{item.name}</h3>
									<p className="text-xs text-gray-500">
										Category: {item.category}
									</p>
									<p className="text-xs text-gray-500">
										Store: {item.seller_id}
									</p>
									<div className="flex items-center space-x-2 mt-2">
										<button
											onClick={() => handleQuantityChange(item.id, -1)}
											className="px-2 py-1 bg-green-200 rounded-md"
										>
											-
										</button>
										<span>{item.quantity}</span>
										<button
											onClick={() => handleQuantityChange(item.id, 1)}
											className="px-2 py-1 bg-green-200 rounded-md"
										>
											+
										</button>
									</div>
								</div>
								<div className="text-right">
									<p className="text-sm font-semibold text-red-600">
										Rp {item.price.toLocaleString()}
									</p>
								</div>
							</div>
							<div className="flex flex-col items-center space-y-2">
								<button
									onClick={() => handleRemoveItem(item.id)}
									className="text-gray-500 hover:text-red-600"
								>
									<FaTrashAlt />
								</button>
							</div>
						</li>
					))}
				</ul>
				<div className="mt-4">
					<p className="text-right text-lg font-semibold">
						Total: Rp{" "}
						{items
							.reduce((total, item) => total + item.price * item.quantity, 0)
							.toLocaleString()}
					</p>
				</div>
				<button
					onClick={handleCheckout}
					className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
				>
					Checkout
				</button>
				<p className="mt-2 text-center text-green-600 cursor-pointer hover:underline">
					View More Products
				</p>
			</div>
		</div>
	);
};

export default ShoppingCart;
