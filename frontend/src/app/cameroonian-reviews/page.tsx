'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface Review {
  id: string;
  rating: number;
  comment: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  guestName?: string;
  country: string;
  createdAt: string;
}

interface AnimationOptions {
  triggerOnce: boolean;
  threshold: number;
}

const AnimatedTestimonial = ({ testimonial, animationOptions }: { testimonial: Review; animationOptions: AnimationOptions; }) => {
  const { ref, inView } = useInView(animationOptions);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="flex items-center mb-6">
        {renderStars(testimonial.rating)}
      </div>
      <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 italic">
        {`"${testimonial.comment}"`}
      </blockquote>
      <div className="flex items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 bg-green-100 flex items-center justify-center">
          <span className="text-green-600 text-xl font-bold">
            {testimonial.user 
              ? testimonial.user.firstName.charAt(0).toUpperCase() 
              : testimonial.guestName?.charAt(0).toUpperCase() || '?'}
          </span>
        </div>
        <div>
          <div className="font-semibold text-gray-800 text-lg">
            {testimonial.user ? `${testimonial.user.firstName} ${testimonial.user.lastName}` : testimonial.guestName}
          </div>
          <div className="text-gray-500 text-sm">{testimonial.country}</div>
        </div>
      </div>
    </div>
  );
};

export default function CameroonianReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const animationOptions: AnimationOptions = {
    triggerOnce: true,
    threshold: 0.1,
  };

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        setLoading(true);
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://earthlixir-backend.vercel.app';
        const response = await axios.get<Review[]>(`${backendUrl}/api/reviews`);
        setReviews(response.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllReviews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          Customer Reviews
        </h1>

        {loading ? (
          <p className="text-center text-gray-700 text-lg">Loading feedback...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">Error: {error}</p>
        ) : reviews.length === 0 ? (
          <div className="text-center">
            <p className="text-center text-gray-700 text-lg mb-8">No reviews yet.</p>
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-colors duration-300"
            >
              Add Your Review
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((testimonial) => (
              <AnimatedTestimonial
                key={testimonial.id}
                testimonial={testimonial}
                animationOptions={animationOptions}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
