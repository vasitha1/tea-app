'use client';

import React from 'react';

const DashboardContent: React.FC = () => {
  return (
    <div className="flex-1 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Dashboard Cards */}
        <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Total Products</h2>
          <p className="text-3xl font-bold text-green-600">150</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">New Orders</h2>
          <p className="text-3xl font-bold text-blue-600">5</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border border-yellow-200">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">Pending Reviews</h2>
          <p className="text-3xl font-bold text-yellow-600">12</p>
        </div>
      </div>
      {/* Further dashboard content will go here, e.g., recent orders, sales charts, etc. */}
    </div>
  );
};

export default DashboardContent;
