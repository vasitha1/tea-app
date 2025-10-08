'use client';

import React, { useState } from 'react';
import axios from 'axios';
// import { useRouter } from 'next/navigation'; // Removed useRouter as it's no longer used for redirection after auth removal

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onReviewSubmitted }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (rating === 0) {
      setError('Please provide a rating.');
      setLoading(false);
      return;
    }

    if (!guestName || !guestEmail) {
      setError('Please provide your name and email.');
      setLoading(false);
      return;
    }

    if (!country) {
      setError('Please provide your country.');
      setLoading(false);
      return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
      await axios.post(`${backendUrl}/api/reviews`, {
        productId,
        rating,
        comment,
        country,
        guestName,
        guestEmail,
      });
      setSuccess('Review submitted successfully!');
      setRating(0);
      setComment('');
      setCountry('');
      setGuestName('');
      setGuestEmail('');
      onReviewSubmitted();
    } catch (err) {
      console.error('Error submitting review:', err);
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Submit Your Review</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="rating" className="block text-lg font-medium text-gray-700 mb-2">Your Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <label key={starValue} className="cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={starValue}
                  checked={rating === starValue}
                  onChange={() => setRating(starValue)}
                  className="sr-only"
                />
                <span className={`text-3xl ${starValue <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors duration-200`}>★</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="guestName" className="block text-lg font-medium text-gray-700 mb-2">Your Name</label>
          <input
            id="guestName"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label htmlFor="guestEmail" className="block text-lg font-medium text-gray-700 mb-2">Your Email</label>
          <input
            id="guestEmail"
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-lg font-medium text-gray-700 mb-2">Your Country</label>
          <input
            id="country"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g., Cameroon"
            required
          />
        </div>
        
        <div>
          <label htmlFor="comment" className="block text-lg font-medium text-gray-700 mb-2">Your Comment</label>
          <textarea
            id="comment"
            rows={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about the product..."
          ></textarea>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          className="w-full px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
