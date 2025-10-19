'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getApiUrl } from '@/utils/api';

interface Review {
  id: string;
  rating: number;
  comment: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
  product: {
    id: string;
    name: string;
  };
  createdAt: string;
}

const AdminDashboardPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchReviews = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get<Review[]>(getApiUrl('/api/reviews'), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviews(response.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      if (axios.isAxiosError(err) && err.response && err.response.status === 403) {
        setError('Forbidden: You do not have admin privileges.');
      } else if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
        router.push('/admin/login'); // Redirect to login if unauthorized
      } else {
        setError('Failed to load reviews.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = async (reviewId: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    try {
      // In a real application, you might have an 'approved' field in the Review entity
      // For now, this is a placeholder. You'd send a PATCH request to update the review status.
      await axios.patch(getApiUrl(`/api/reviews/${reviewId}`), { /* approved: true */ }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Review approved (placeholder action)!');
      fetchReviews(); // Re-fetch reviews to update the list
    } catch (err) {
      console.error('Error approving review:', err);
      setError('Failed to approve review.');
    }
  };

  const handleReject = async (reviewId: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    try {
      await axios.delete(getApiUrl(`/api/reviews/${reviewId}`), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Review rejected and deleted!');
      fetchReviews(); // Re-fetch reviews to update the list
    } catch (err) {
      console.error('Error rejecting review:', err);
      setError('Failed to reject review.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
        <p className="text-xl text-gray-700">Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
        <p className="text-xl text-red-500">Error: {error}</p>
        {error === 'Forbidden: You do not have admin privileges.' && (
          <button onClick={() => router.push('/admin/login')} className="mt-4 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300">
            Go to Login
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Review Management Section */}
        <section className="mb-12 bg-white p-6 rounded-lg shadow">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Review Management</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews to moderate.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reviews.map((review) => (
                    <tr key={review.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{review.product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{review.user.firstName} {review.user.lastName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{review.rating}/5</td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs overflow-hidden truncate">{review.comment}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleApprove(review.id)}
                          className="text-green-600 hover:text-green-900 mr-4"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(review.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* User Management Section (Placeholder) */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">User Management</h2>
          <p className="text-gray-600">User management features will be implemented here.</p>
          {/* Add user management components here */}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
