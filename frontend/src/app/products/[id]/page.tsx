'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { products } from '@/data/products';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const productId = parseInt(params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    // Handle case where product is not found, e.g., redirect to a 404 page or catalog
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Product Not Found</h1>
        <button onClick={() => router.push('/catalog')} className="mt-4 px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-300">
          Go to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        <div className="md:flex-shrink-0">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={400}
            className="md:w-auto w-full h-auto object-cover"
          />
        </div>
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 text-xl mb-6">{product.shortDescription}</p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Description</h2>
          <p className="text-gray-700 mb-6">{product.longDescription}</p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Health Benefits</h2>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            {product.healthBenefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Brewing Instructions</h2>
          <ul className="list-decimal list-inside text-gray-700 mb-6">
            {product.brewingInstructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Health Disclaimer</h2>
          <p className="text-sm text-gray-500 italic">{product.healthDisclaimer}</p>

          <button onClick={() => router.back()} className="mt-8 px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-300">
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}
