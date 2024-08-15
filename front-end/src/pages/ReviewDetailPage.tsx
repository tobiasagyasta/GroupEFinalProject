import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { reviewsData, Review } from "../lib/ReviewsData";
import Header from "@/lib/Header";
import Footer from "@/lib/Footer";

const ReviewDetailPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const navigate = useNavigate();

  if (!reviewId) {
    return <div>Invalid review ID.</div>;
  }

  const reviews = reviewsData[reviewId];

  if (!reviews || reviews.length === 0) {
    return <div>Review not found.</div>;
  }

  const review = reviews.find((r: Review) => r.id === reviewId);

  if (!review) {
    return <div>Review not found.</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-8"
        >
          Back
        </button>

        {/* Review Detail */}
        <div className="border p-4 rounded-md mb-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              {review.image && (
                <img
                  src={review.image}
                  alt={`Review by ${review.reviewerName}`}
                  className="w-48 h-48 object-cover rounded-md"
                />
              )}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-xl mb-2">
                {review.reviewerName}
              </div>
              <div className="text-yellow-500 mb-2">
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
              </div>
              <p>{review.comment}</p>
            </div>
          </div>
        </div>

        {/* Other Reviews */}
        <div className="space-y-4">
          {reviews
            .filter((r) => r.id !== reviewId)
            .map((r: Review) => (
              <div key={r.id} className="border p-4 rounded-md">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    {r.image && (
                      <img
                        src={r.image}
                        alt={`Review by ${r.reviewerName}`}
                        className="w-48 h-48 object-cover rounded-md"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg mb-2">
                      {r.reviewerName}
                    </div>
                    <div className="text-yellow-500 mb-2">
                      {"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}
                    </div>
                    <p>{r.comment}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReviewDetailPage;
