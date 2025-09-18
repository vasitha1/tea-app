import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  image_url: string;
  category_id?: number;
}

const AdminProductsPage: React.FC = () => {
  const { user, isAuthenticated, token } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
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

    fetchProducts();
  }, [isAuthenticated, user, router, token]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching products.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      alert('Product deleted successfully!');
      fetchProducts(); // Refresh the list
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting the product.');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading Products...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Manage Products</h1>
      <div className="flex justify-end mb-6">
        <Link href="/admin/products/new" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">
          Add New Product
        </Link>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {products.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Image</th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Name</th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Price</th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Stock</th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="py-2 px-4 border-b">
                      <Image src={product.image_url || '/placeholder.jpg'} alt={product.name} width={50} height={50} className="rounded-md object-cover" />
                    </td>
                    <td className="py-2 px-4 border-b text-gray-800">{product.name}</td>
                    <td className="py-2 px-4 border-b text-gray-800">${product.price.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b text-gray-800">{product.stock_quantity}</td>
                    <td className="py-2 px-4 border-b">
                      <Link href={`/admin/products/edit/${product.id}`} className="text-blue-600 hover:underline mr-4">Edit</Link>
                      <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:underline">
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

export default AdminProductsPage;
