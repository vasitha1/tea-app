'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const AdminDashboardPage: React.FC = () => {
  const { user, isAuthenticated, token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else if (!user?.is_admin) {
      router.push('/'); // Redirect non-admin users to homepage
      alert('Access Denied: You are not authorized to view this page.');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user, router]);

  if (loading || !user?.is_admin) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/products" className="block bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-50 transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Products</h2>
          <p className="text-gray-600 mt-2">Add, edit, and delete products.</p>
        </Link>
        <Link href="/admin/orders" className="block bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-50 transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Orders</h2>
          <p className="text-gray-600 mt-2">View and update customer orders.</p>
        </Link>
        <Link href="/admin/reviews" className="block bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-50 transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Reviews</h2>
          <p className="text-gray-600 mt-2">Moderate customer feedback and ratings.</p>
        </Link>
        {/* Add more admin links as needed */}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
