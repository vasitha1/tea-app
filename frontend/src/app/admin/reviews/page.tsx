import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface Review {
  id: number;
  product: { name: string; };
  user: { email: string; };
  rating: number;
  comment?: string;
  created_at: string;
}

const AdminReviewsPage: React.FC = () => {
  const { user, isAuthenticated, token } = useAuth();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    if (!user?.is_admin) {
      router.push('/');
      alert('Access Denied: You are not authorized to view this page.');
      return;
    }

    fetchReviews();
  }, [isAuthenticated, user, router, token]);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data: Review[] = await response.json();
      setReviews(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching reviews.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      alert('Review deleted successfully!');
      fetchReviews(); // Refresh the list
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting the review.');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading Reviews...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Manage Reviews</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-600">No reviews found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Product</th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">User</th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Rating</th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Comment</th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Date</th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id}>
                    <td className="py-2 px-4 border-b text-gray-800"><Link href={`/product/${review.product.id}`} className="text-blue-600 hover:underline">{review.product.name}</Link></td>
                    <td className="py-2 px-4 border-b text-gray-800">{review.user?.email || 'N/A'}</td>
                    <td className="py-2 px-4 border-b text-gray-800">{'⭐'.repeat(review.rating)}</td>
                    <td className="py-2 px-4 border-b text-gray-800">{review.comment || 'N/A'}</td>
                    <td className="py-2 px-4 border-b text-gray-800">{new Date(review.created_at).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">
                      <button onClick={() => handleDelete(review.id)} className="text-red-600 hover:underline">
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
    </div>
  );
};

export default AdminReviewsPage;
