import { useState, useEffect } from "react";
import { CommentRatings } from "./CommentRatings";
import { fetchCurrentUser } from "@/lib/api";
import { User } from "@/lib/types";
import { apiBaseUrl } from "@/lib/api";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";

const ReviewsCard = ({ product_id }: { product_id: string }) => {
	const { toast } = useToast();
	const [user, setUser] = useState<User | null>(null);
	const [buyerId, setBuyerId] = useState<number | null>(null);
	const [rating, setRating] = useState<number>(0); // State to manage rating
	const [comment, setComment] = useState<string>(""); // State to manage comment

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

	const handleSubmit = async () => {
		if (!buyerId) {
			console.error("Buyer ID is missing");
			return;
		}

		const reviewData = {
			product_id: product_id,
			buyer_id: buyerId,
			rating: rating,
			comment: comment,
		};

		try {
			const response = await fetch(`${apiBaseUrl}/review/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(reviewData),
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message);
			}
			toast({
				title: "Review sudah terkirim!",
				description: `Terima kasih atas opini anda.`,
				className: "bg-green-500",
			});

			const data = await response.json();
			console.log("Review submitted successfully:", data);
			// Optionally, clear the form or show a success message here
		} catch (error: any) {
			console.error("Error submitting review:", error);
			toast({
				title: "Review gagal",
				description: error.message,
				variant: "destructive",
			});
		}
	};

	return (
		<div className='flex flex-col gap-y-4 w-[60%] items-center text-center'>
			<h2 className='text-xl font-semibold mb-2'>Sampaikan Opini Anda!</h2>
			<CommentRatings
				rating={rating}
				totalStars={5}
				onRatingChange={setRating} // Pass the state updater function
			/>
			<Textarea
				className='w-1/2 mt-2'
				placeholder='Ketik review produk ini disini.'
				value={comment}
				onChange={(e) => setComment(e.target.value)}
			/>
			<Button onClick={handleSubmit}>Submit Review</Button>
		</div>
	);
};

export default ReviewsCard;
