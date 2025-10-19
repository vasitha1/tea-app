'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import AdminHeader from '../../../components/Admin/AdminHeader';
import Sidebar from '../../../components/Admin/Sidebar';

interface Review {
  id: string;
  product: {
    id: string;
    name: string;
  };
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  guestName?: string;
  guestEmail?: string;
  rating: number;
  comment: string;
  country: string;
  createdAt: string;
}

const AdminReviewsPage: React.FC = () => {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const decodeToken = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const decodedToken = decodeToken(token);
    if (!decodedToken || !decodedToken.isAdmin) {
      router.push('/admin/login');
      return;
    }

    setIsAdmin(true);
    fetchReviews();
  }, [router]);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://earthlixir-backend.vercel.app';
      const response = await axios.get<Review[]>(`${backendUrl}/api/reviews`);
      setReviews(response.data);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || 'Failed to fetch reviews';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return;
    }
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://earthlixir-backend.vercel.app';
      const token = localStorage.getItem('accessToken');
      await axios.delete(`${backendUrl}/api/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Review deleted successfully!');
      fetchReviews();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || 'Failed to delete review';
      alert(errorMessage);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Reviews</h1>

            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600 mb-4"></div>
                <p className="text-gray-700 text-lg">Loading reviews...</p>
              </div>
            ) : error ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-red-600 text-lg">{error}</p>
                <button
                  onClick={fetchReviews}
                  className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {reviews.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-gray-600 text-lg">No reviews found.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Reviewer
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Country
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rating
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Comment
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reviews.map((review) => (
                          <tr key={review.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <Link
                                href={`/products/${review.product.id}`}
                                className="text-blue-600 hover:text-blue-900 font-medium"
                              >
                                {review.product.name}
                              </Link>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">
                                {review.user
                                  ? `${review.user.firstName} ${review.user.lastName}`
                                  : review.guestName || 'Anonymous'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {review.user ? review.user.email : review.guestEmail || 'N/A'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {review.country}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="text-yellow-500 text-lg">{'★'.repeat(review.rating)}</span>
                                <span className="text-gray-300 text-lg">{'★'.repeat(5 - review.rating)}</span>
                                <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                              <div className="line-clamp-2">{review.comment}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleDelete(review.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminReviewsPage;