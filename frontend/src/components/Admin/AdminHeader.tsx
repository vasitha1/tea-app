'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const AdminHeader: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/admin/login');
  };

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="text-xl font-semibold text-gray-800">
        <Link href="/admin">Admin Dashboard</Link>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/admin/products" className={`text-gray-600 hover:text-green-600 ${pathname === '/admin/products' ? 'font-bold text-green-600' : ''}`}>
              Products
            </Link>
          </li>
          <li>
            <Link href="/admin/reviews" className={`text-gray-600 hover:text-green-600 ${pathname === '/admin/reviews' ? 'font-bold text-green-600' : ''}`}>
              Reviews
            </Link>
          </li>
          <li>
            <Link href="/admin/orders" className={`text-gray-600 hover:text-green-600 ${pathname === '/admin/orders' ? 'font-bold text-green-600' : ''}`}>
              Orders
            </Link>
          </li>
          <li>
            <Link href="/admin/users" className={`text-gray-600 hover:text-green-600 ${pathname === '/admin/users' ? 'font-bold text-green-600' : ''}`}>
              Users
            </Link>
          </li>
          <li>
            <Link href="/admin/faqs" className={`text-gray-600 hover:text-green-600 ${pathname === '/admin/faqs' ? 'font-bold text-green-600' : ''}`}>
              FAQs
            </Link>
          </li>
          {/* Add more admin navigation links as needed */}
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <p className="text-gray-600">Welcome, Admin!</p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
