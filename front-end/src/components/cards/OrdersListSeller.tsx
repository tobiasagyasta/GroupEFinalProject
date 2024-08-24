import React, { useEffect, useState } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiBaseUrl, fetchCurrentUser } from "@/lib/api";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { User } from "@/lib/types";

interface OrderItem {
	product_id: number;
	seller_id: number;
	product_name: string;
	quantity: number;
	price: number;
	product_picture_url: string;
}

interface Order {
	order_id: number;
	user_id: number;
	total_price: number;
	payment_method: string;
	order_date: string;
	status: string;
	items: OrderItem[];
	transaction_id: string;
}

const OrdersListSeller = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState<User | null>(null);
	const [orders, setOrders] = useState<Order[]>([]);
	const [sellerId, setSellerId] = useState<number | null>(null);

	const handleAcceptOrder = async (orderId: number) => {
		try {
			const response = await fetch(`${apiBaseUrl}/order/${orderId}/status`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ status: "accepted" }),
			});

			if (!response.ok) {
				throw new Error("Failed to update order status");
			}

			navigate(`/transfer/${orderId}`);
		} catch (error) {
			console.error("Error updating order status:", error);
			alert("Failed to process payment. Please try again.");
		}
	};

	const handleCancelOrder = async (orderId: number) => {
		try {
			const response = await fetch(`${apiBaseUrl}/order/${orderId}/status`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ status: "cancelled" }),
			});

			if (!response.ok) {
				throw new Error("Failed to update order status");
			}

			alert("Order has been cancelled.");
		} catch (error) {
			console.error("Error updating order status:", error);
			alert("Failed to cancel order. Please try again.");
		}
	};

	useEffect(() => {
		const fetchUser = async () => {
			const currentUser = await fetchCurrentUser();
			setUser(currentUser);

			if (currentUser) {
				try {
					const response = await fetch(
						`${apiBaseUrl}/users/get-seller-id/${currentUser.id}`
					);
					const data = await response.json();

					if (response.ok) {
						setSellerId(data.seller_id);
					} else {
						console.error("Failed to fetch seller ID:", data.error);
					}
				} catch (error) {
					console.error("Error fetching seller ID:", error);
				}
			}
		};
		fetchUser();
	}, []);

	useEffect(() => {
		const fetchOrders = async () => {
			if (sellerId) {
				try {
					const response = await fetch(
						`${apiBaseUrl}/order/seller/${sellerId}`,
						{
							method: "GET",
						}
					);

					if (response.ok) {
						const data = await response.json();
						setOrders(data.orders);
					} else {
						console.error("Failed to fetch orders:", response.statusText);
					}
				} catch (error) {
					console.error("Error fetching orders:", error);
				}
			}
		};
		fetchOrders();
	}, [sellerId]);

	const filterOrdersByStatus = (status: string) => {
		return orders.filter((order) => order.status === status);
	};

	const renderOrders = (orders: Order[]) => {
		return orders.map((order) => (
			<Card key={order.order_id} className="mb-4">
				<CardHeader>
					<CardTitle>Transaction ID: {order.transaction_id}</CardTitle>
					<CardDescription>
						Total: Rp {order.total_price.toLocaleString()}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Payment Method: {order.payment_method}</p>
					<p>Order Date: {new Date(order.order_date).toLocaleString()}</p>
					<p>Order Status: {order.status}</p>
					<div>
						{order.items.map((item, index) => (
							<div key={item.product_id} className="flex items-center my-2">
								<div>
									<p>#{index + 1}</p>
									<p>{item.product_name}</p>
									<p>Price: Rp {item.price.toLocaleString()}</p>
									<p>Quantity: {item.quantity}</p>
								</div>
							</div>
						))}
					</div>
				</CardContent>
				<CardFooter>
					<div className="flex justify-evenly">
						{order.status === "processing" && (
							<div className="">
								<Button
									className="w-1/2"
									onClick={() => handleAcceptOrder(order.order_id)}
								>
									Accept Order
								</Button>
								<Button
									className="w-1/2"
									variant="destructive"
									onClick={() => handleCancelOrder(order.order_id)}
								>
									Cancel Order
								</Button>
							</div>
						)}
						{order.status !== "pending" && (
							<Button
								onClick={() => {
									navigate(`/transfer/${order.order_id}`);
								}}
							>
								View Details
							</Button>
						)}
					</div>
				</CardFooter>
			</Card>
		));
	};

	return (
		<Tabs defaultValue="semua" className="w-[400px]">
			<TabsList>
				<TabsTrigger value="semua">Semua</TabsTrigger>
				<TabsTrigger value="processing">Sedang Diproses</TabsTrigger>
				<TabsTrigger value="accepted">Terkonfirmasi</TabsTrigger>
				<TabsTrigger value="cancelled">Batal</TabsTrigger>
			</TabsList>
			<TabsContent value="semua">{renderOrders(orders)}</TabsContent>
			<TabsContent value="processing">
				{renderOrders(filterOrdersByStatus("processing"))}
			</TabsContent>
			<TabsContent value="accepted">
				{renderOrders(filterOrdersByStatus("accepted"))}
			</TabsContent>
			<TabsContent value="cancelled">
				{renderOrders(filterOrdersByStatus("cancelled"))}
			</TabsContent>
		</Tabs>
	);
};

export default OrdersListSeller;
