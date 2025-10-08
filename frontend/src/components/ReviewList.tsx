'use client';

import React from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  user?: User;
  guestName?: string;
  createdAt: string;
}

interface ReviewListProps {
  reviews: Review[];
  averageRating: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, averageRating }) => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

      {averageRating > 0 && (
        <div className="flex items-center mb-6">
          <span className="text-4xl font-bold text-gray-800 mr-2">{averageRating.toFixed(1)}</span>
          <div className="flex items-center mr-4">
            {renderStars(averageRating)}
          </div>
          <span className="text-gray-600">({reviews.length} Reviews)</span>
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
      ) : (
        <div className="space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-center mb-3">
                <div className="flex items-center mr-4">
                  {renderStars(review.rating)}
                </div>
                <p className="font-semibold text-gray-800">
                  {review.user ? `${review.user.firstName} ${review.user.lastName}` : review.guestName}
                </p>
                <p className="text-gray-500 text-sm ml-auto">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
