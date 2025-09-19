'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
}

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  image_url: string;
  category_id?: number;
}

const AdminProductForm: React.FC<{ productId?: number }> = ({ productId }) => {
  const { user, isAuthenticated, token } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    image_url: '',
    category_id: undefined,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data: Category[] = await response.json();
      setCategories(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load categories.';
      console.error('Error fetching categories:', err);
      setError(errorMessage);
    }
  }, [token]);

  const fetchProduct = useCallback(async (id: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data: ProductFormData = await response.json();
      setFormData(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching product details.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [token]);

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
    fetchCategories();
    if (productId) {
      fetchProduct(productId);
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user, router, fetchCategories, fetchProduct, productId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;
    setUploadingImage(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', imageFile);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/upload-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Image upload failed');
      }
      const result = await response.json();
      setFormData((prev) => ({ ...prev, image_url: result.url }));
      alert('Image uploaded successfully!');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during image upload.';
      console.error('Image upload error:', err);
      setError(errorMessage);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const url = productId
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${productId}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`;
    const method = productId ? 'PUT' : 'POST';
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${productId ? 'update' : 'create'} product`);
      }
      alert(`Product ${productId ? 'updated' : 'created'} successfully!`);
      router.push('/admin/products');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading Product Form...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">{productId ? 'Edit Product' : 'Add New Product'}</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Product Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" step="0.01" required />
            </div>
            <div>
              <label htmlFor="stock_quantity" className="block text-gray-700 text-sm font-bold mb-2">Stock Quantity:</label>
              <input type="number" id="stock_quantity" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="category_id" className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
            <select id="category_id" name="category_id" value={formData.category_id || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="image_upload" className="block text-gray-700 text-sm font-bold mb-2">Product Image:</label>
            <input type="file" id="image_upload" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
            <button
              type="button"
              onClick={handleImageUpload}
              disabled={!imageFile || uploadingImage}
              className="mt-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              {uploadingImage ? 'Uploading...' : 'Upload Image'}
            </button>
            {formData.image_url && (
              <div className="mt-4">
                <p className="text-gray-700 text-sm mb-2">Current Image:</p>
                <Image src={formData.image_url} alt="Product Image" width={100} height={100} className="rounded-md object-cover" />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              disabled={submitting || uploadingImage}
            >
              {submitting ? 'Saving...' : (productId ? 'Update Product' : 'Add Product')}
            </button>
            <Link href="/admin/products" className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;