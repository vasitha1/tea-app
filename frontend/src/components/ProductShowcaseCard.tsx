'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/page'; // Adjust path as needed

interface ProductShowcaseCardProps {
  product: Product;
}

export default function ProductShowcaseCard({ product }: ProductShowcaseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer h-full flex flex-col">
      <div className="relative w-full h-56">
        <Image
          src={product.imageUrl?.startsWith('http') ? product.imageUrl : product.imageUrl?.replace('/images/', '/') || '/placeholder.jpg'}
          alt={product.name}
          fill // Use fill to make the image cover the parent div
          style={{ objectFit: 'cover' }} // Ensure the image covers the area without distortion
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive image sizes
        />
      </div>
      <div className="p-4 flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        {product.shortDescription && (
          <p className="text-gray-600 text-sm">{product.shortDescription}</p>
        )}
      </div>
      <div className="p-4 border-t border-gray-100 mt-auto">
        <Link
          href={`/products/${product.id}`}
          className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
