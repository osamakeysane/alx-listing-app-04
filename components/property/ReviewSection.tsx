import axios from "axios";
import { useState, useEffect } from "react";

interface Review {
  id: number;
  reviewerName: string;
  rating: number;
  comment: string;
}

interface ReviewSectionProps {
  propertyId: string | number;
}

const ReviewSection = ({ propertyId }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `/api/properties/${propertyId}/reviews`
        );
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) {
    return <p className="text-gray-500">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet for this property.</p>;
  }

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-semibold mb-2">Guest Reviews</h2>

      {reviews.map((review) => (
        <div
          key={review.id}
          className="border p-3 rounded-lg shadow-sm bg-white"
        >
          <p className="font-semibold">{review.reviewerName}</p>
          <p className="text-yellow-500">⭐ {review.rating}/5</p>
          <p className="text-gray-700 mt-1">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
