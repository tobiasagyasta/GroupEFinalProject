import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Review, reviewsData } from "@/components/HarvestHub/ReviewsData";

const ReviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return <div>Invalid parameters</div>;
  }

  const productReviews = reviewsData[id] || [];

  if (productReviews.length === 0) {
    return <div>No reviews available</div>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleBackClick}
        className="text-blue-500 hover:underline mb-4"
      >
        &lt; Back
      </button>
      {productReviews.slice(0, 2).map((review) => (
        <div
          key={review.id}
          className="bg-white p-4 rounded-lg shadow-md mb-10 flex"
        >
          {review.image && (
            <img
              src={review.image}
              alt={`Review by ${review.reviewerName}`}
              className="w-40 h-40 object-cover rounded-lg shadow-md mr-4"
            />
          )}
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-bold mb-2">{review.reviewerName}</p>
              <p className="flex items-center mb-2">
                Rating: {review.rating}{" "}
                <FaStar className="inline-block text-yellow-500 ml-1" />
              </p>
              <p className="mb-2">{review.comment}</p>
            </div>
            {review.additionalImages && review.additionalImages.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {review.additionalImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Additional review image ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewDetailPage;
