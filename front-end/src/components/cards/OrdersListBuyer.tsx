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
import { Link } from "react-router-dom";
import { User } from "@/lib/types";
import { useNavigate } from "react-router-dom";

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

const OrdersListBuyer = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState<User>();
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		const fetchUser = async () => {
			const currentUser = await fetchCurrentUser();
			setUser(currentUser);
		};
		fetchUser();
	}, []);

	useEffect(() => {
		const fetchOrders = async () => {
			if (user?.id) {
				try {
					const response = await fetch(`${apiBaseUrl}/order/user/${user.id}`, {
						method: "GET",
					});

					if (response.ok) {
						const data = await response.json();
						setOrders(data.orders);
					}
				} catch (error) {
					console.error("Error fetching orders:", error);
				}
			}
		};
		fetchOrders();
	}, [user]);

	// Filter orders by status
	const filterOrdersByStatus = (status: string) => {
		return orders.filter((order) => order.status === status);
	};

	// Render orders in cards
	const renderOrders = (orders: Order[]) => {
		return orders.map((order) => (
			<Card key={order.order_id} className='mb-4'>
				<CardHeader>
					<CardTitle>Transaction ID: {order.transaction_id}</CardTitle>
					<CardDescription>
						Total: Rp {order.total_price.toLocaleString()}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Payment Method: {order.payment_method}</p>
					<p>Order Date: {new Date(order.order_date).toLocaleString()}</p>
					<p>Order Status : {order.status}</p>
					<div>
						{order.items.map((item, index) => (
							<div key={item.product_id} className='flex items-center my-2'>
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
					{order.status !== "pending" && (
						<>
							<Button
								onClick={() => {
									navigate(`/transfer/${order.order_id}`);
								}}
							>
								View Details
							</Button>
						</>
					)}
				</CardFooter>
			</Card>
		));
	};

	return (
		<>
			<Tabs defaultValue='semua' className='w-[400px]'>
				<TabsList>
					<TabsTrigger value='semua'>Semua</TabsTrigger>
					<TabsTrigger value='processing'>Sedang Diproses</TabsTrigger>
					<TabsTrigger value='accepted'>Terkonfirmasi</TabsTrigger>
					<TabsTrigger value='cancelled'>Batal</TabsTrigger>
				</TabsList>
				<TabsContent value='semua'>{renderOrders(orders)}</TabsContent>
				<TabsContent value='processing'>
					{renderOrders(filterOrdersByStatus("processing"))}
				</TabsContent>
				<TabsContent value='accepted'>
					{renderOrders(filterOrdersByStatus("accepted"))}
				</TabsContent>
				<TabsContent value='cancelled'>
					{renderOrders(filterOrdersByStatus("cancelled"))}
				</TabsContent>
			</Tabs>
		</>
	);
};

export default OrdersListBuyer;
