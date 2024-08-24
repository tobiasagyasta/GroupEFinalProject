import React, { useEffect, useState } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "../ui/card"; // Adjust import paths as needed
import { apiBaseUrl } from "@/lib/api"; // Adjust import path as needed
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const ReviewsByBuyer = ({ buyer_id }: { buyer_id: string }) => {
	const [buyerId, setBuyerId] = useState<string | null>(buyer_id);
	const [reviews, setReviews] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchReviews = async () => {
			setLoading(true);
			try {
				const response = await fetch(`${apiBaseUrl}/review/buyer/${buyerId}`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setReviews(data);
			} catch (error) {
				setError("Error fetching reviews");
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchReviews();
	}, [buyerId]);

	const deleteReview = async (reviewId: number) => {
		try {
			const response = await fetch(`${apiBaseUrl}/review/${reviewId}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			// Remove the deleted review from the state
			setReviews(reviews.filter((review) => review.id !== reviewId));
		} catch (error) {
			setError("Error deleting review");
			console.error(error);
		}
	};

	if (loading) return <div>Loading...</div>;
	// if (error) return <div>{error}</div>;

	return (
		<div className="space-y-2">
			{reviews.length > 0 ? (
				reviews.map((review: any) => (
					<Card key={review.id}>
						<CardHeader>
							<div className="flex items-center">
								<div className="ml-4">
									<CardTitle>Review for Product #{review.product_id}</CardTitle>
									<CardDescription>Rating: {review.rating} / 5</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<p>{review.comment}</p>
						</CardContent>
						<CardFooter>
							<Link to={`/product/${review.product_id}`}>
								<Button>View Product</Button>
							</Link>
							<Button onClick={() => deleteReview(review.id)} className="ml-2">
								Delete Review
							</Button>
						</CardFooter>
					</Card>
				))
			) : (
				<p>No reviews found for this buyer.</p>
			)}
		</div>
	);
};

export default ReviewsByBuyer;
