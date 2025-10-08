'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

interface ProductFormData {
  name: string;
  flavor?: string;
  shortDescription?: string;
  longDescription?: string;
  healthBenefits?: string;
  brewingInstructions?: string;
  healthDisclaimer?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
}

const AdminProductForm: React.FC<{ productId?: string }> = ({ productId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    flavor: '',
    shortDescription: '',
    longDescription: '',
    healthBenefits: '',
    brewingInstructions: '',
    healthDisclaimer: '',
    price: 0,
    stock: 0,
    imageUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    if (productId) {
      fetchProduct(productId);
    } else {
      setLoading(false);
    }
  }, [productId, router]);

  const fetchProduct = async (id: string) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
      const response = await axios.get(`${backendUrl}/api/products/${id}`);
      const product = response.data;
      
      setFormData({
        name: product.name || '',
        flavor: product.flavor || '',
        shortDescription: product.shortDescription || '',
        longDescription: product.longDescription || '',
        healthBenefits: Array.isArray(product.healthBenefits) ? product.healthBenefits.join('\n') : '',
        brewingInstructions: Array.isArray(product.brewingInstructions) ? product.brewingInstructions.join('\n') : '',
        healthDisclaimer: product.healthDisclaimer || '',
        price: product.price || 0,
        stock: product.stock || 0,
        imageUrl: product.imageUrl || '',
      });
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || 'Failed to fetch product';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? 0 : parseFloat(value)) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        // You can add preview functionality here if needed
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
      const token = localStorage.getItem('accessToken');

      // Prepare the data
      const submitData: Record<string, unknown> = {
        name: formData.name,
        flavor: formData.flavor || undefined,
        shortDescription: formData.shortDescription || undefined,
        longDescription: formData.longDescription || undefined,
        healthBenefits: formData.healthBenefits 
          ? formData.healthBenefits.split('\n').filter(item => item.trim())
          : undefined,
        brewingInstructions: formData.brewingInstructions
          ? formData.brewingInstructions.split('\n').filter(item => item.trim())
          : undefined,
        healthDisclaimer: formData.healthDisclaimer || undefined,
        price: formData.price || undefined,
        stock: formData.stock || undefined,
      };

      // Handle image upload if a file is selected
      if (imageFile) {
        const formDataImage = new FormData();
        formDataImage.append('file', imageFile);

        const uploadResponse = await axios.post(
          `${backendUrl}/api/products/upload-image`,
          formDataImage,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        submitData.imageUrl = uploadResponse.data.url;
      } else if (formData.imageUrl) {
        submitData.imageUrl = formData.imageUrl;
      }

      // Submit the product
      if (productId) {
        await axios.patch(`${backendUrl}/api/products/${productId}`, submitData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Product updated successfully!');
      } else {
        await axios.post(`${backendUrl}/api/products`, submitData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Product created successfully!');
      }

      router.push('/admin/products');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || 'Failed to save product';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600 mb-4"></div>
          <p className="text-gray-700 text-lg">Loading product form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link
            href="/admin/products"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            ← Back to Products
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {productId ? 'Edit Product' : 'Add New Product'}
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Moringa & Ginger Tea"
              />
            </div>

            {/* Flavor */}
            <div>
              <label htmlFor="flavor" className="block text-sm font-medium text-gray-700 mb-2">
                Flavor
              </label>
              <input
                type="text"
                id="flavor"
                name="flavor"
                value={formData.flavor}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Spicy, Earthy, Citrus"
              />
            </div>

            {/* Short Description */}
            <div>
              <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Short Description
              </label>
              <input
                type="text"
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Brief one-line description"
              />
            </div>

            {/* Long Description */}
            <div>
              <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Long Description
              </label>
              <textarea
                id="longDescription"
                name="longDescription"
                rows={4}
                value={formData.longDescription}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Detailed description of the product"
              />
            </div>

            {/* Health Benefits */}
            <div>
              <label htmlFor="healthBenefits" className="block text-sm font-medium text-gray-700 mb-2">
                Health Benefits (one per line)
              </label>
              <textarea
                id="healthBenefits"
                name="healthBenefits"
                rows={5}
                value={formData.healthBenefits}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Boosts immune system&#10;Reduces inflammation&#10;Improves digestion"
              />
              <p className="text-sm text-gray-500 mt-1">Enter each benefit on a new line</p>
            </div>

            {/* Brewing Instructions */}
            <div>
              <label htmlFor="brewingInstructions" className="block text-sm font-medium text-gray-700 mb-2">
                Brewing Instructions (one per line)
              </label>
              <textarea
                id="brewingInstructions"
                name="brewingInstructions"
                rows={5}
                value={formData.brewingInstructions}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Boil water to 212°F (100°C)&#10;Add 1-2 teaspoons of tea&#10;Steep for 5-7 minutes"
              />
              <p className="text-sm text-gray-500 mt-1">Enter each step on a new line</p>
            </div>

            {/* Health Disclaimer */}
            <div>
              <label htmlFor="healthDisclaimer" className="block text-sm font-medium text-gray-700 mb-2">
                Health Disclaimer
              </label>
              <textarea
                id="healthDisclaimer"
                name="healthDisclaimer"
                rows={3}
                value={formData.healthDisclaimer}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Disclaimer about health claims"
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {formData.imageUrl && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                  <div className="relative h-48 w-48">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}${formData.imageUrl}`}
                      alt="Product preview"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                href="/admin/products"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Saving...' : productId ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm;
