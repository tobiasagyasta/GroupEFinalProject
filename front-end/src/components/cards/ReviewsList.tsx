import React from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "../ui/card"; // Adjust import paths as needed
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"; // Adjust import paths as needed

const ReviewCard = ({ review }: { review: any }) => {
	return (
		<Card>
			<CardHeader>
				<div className='flex items-center'>
					<Avatar>
						{review.user.profile_picture_url ? (
							<AvatarImage
								src={review.user.profile_picture_url}
								alt={review.user.name}
							/>
						) : (
							<AvatarFallback>{review.user.name[0]}</AvatarFallback>
						)}
					</Avatar>
					<div className='ml-4'>
						<CardTitle>{review.user.name}</CardTitle>
						<CardDescription>Rating: {review.rating} / 5</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<p>{review.comment}</p>
			</CardContent>
			<CardFooter>{/* You can add more footer content if needed */}</CardFooter>
		</Card>
	);
};

const ReviewsList = ({ reviews }: { reviews: any }) => {
	return (
		<div className='space-y-2'>
			{reviews.map((review: any) => (
				<ReviewCard key={review.id} review={review} />
			))}
		</div>
	);
};

export default ReviewsList;
