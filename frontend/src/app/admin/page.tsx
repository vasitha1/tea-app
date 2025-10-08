'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '../../components/Admin/AdminHeader';
import Sidebar from '../../components/Admin/Sidebar';
import DashboardContent from '../../components/Admin/DashboardContent';

// Helper function to decode JWT token
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
    console.error('Error decoding token:', error);
    return null;
  }
};

const AdminDashboardPage: React.FC = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAdminStatus = () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          router.push('/admin/login');
          return;
        }
        
        const decodedToken = decodeToken(token);
        
        if (decodedToken && decodedToken.isAdmin) {
          // Check if token is expired
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp && decodedToken.exp < currentTime) {
            localStorage.removeItem('accessToken');
            router.push('/admin/login');
            return;
          }
          setIsAdmin(true);
        } else {
          localStorage.removeItem('accessToken');
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Admin check failed:', error);
        localStorage.removeItem('accessToken');
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    checkAdminStatus();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Loading admin panel...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Redirect handled by useEffect
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-8">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
