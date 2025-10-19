'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '@/app/page';
import ProductShowcaseCard from '@/components/ProductShowcaseCard';
import { getApiUrl, API_ENDPOINTS } from '@/utils/api';

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Product[]>(getApiUrl(API_ENDPOINTS.PRODUCTS));
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.flavor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Our Tea Collection
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-50 max-w-3xl mx-auto">
            Discover handcrafted organic herbal teas from the heart of Cameroon
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for teas by name or flavor..."
                className="w-full px-6 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-green-300 shadow-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-green-600 mb-2">{products.length}</div>
            <div className="text-gray-600 font-medium">Premium Teas</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600 font-medium">Organic & Natural</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-green-600 mb-2">0%</div>
            <div className="text-gray-600 font-medium">Caffeine Free</div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mb-4"></div>
            <p className="text-gray-700 text-xl">Loading our tea collection...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍵</div>
            <p className="text-red-500 text-xl font-semibold mb-2">Oops! Something went wrong</p>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-700 text-xl font-semibold mb-2">No teas found</p>
            <p className="text-gray-600">Try adjusting your search or browse all our products</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                {searchTerm ? `Search Results (${filteredProducts.length})` : `All Products (${filteredProducts.length})`}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductShowcaseCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* CTA Section */}
      {!loading && !error && products.length > 0 && (
        <div className="bg-green-600 text-white py-16 mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">Not sure which tea to choose?</h2>
            <p className="text-xl mb-8 text-green-50">Contact us for personalized recommendations based on your wellness goals</p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-green-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-xl transform hover:scale-105"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
