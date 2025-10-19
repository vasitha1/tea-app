'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AdminHeader from '../../../components/Admin/AdminHeader';
import Sidebar from '../../../components/Admin/Sidebar';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  createdAt: string;
}

const AdminFAQsPage: React.FC = () => {
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({ question: '', answer: '', order: 0 });

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
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const decodedToken = decodeToken(token);
    if (!decodedToken || !decodedToken.isAdmin) {
      router.push('/admin/login');
      return;
    }

    setIsAdmin(true);
    fetchFAQs();
  }, [router]);

  const fetchFAQs = async () => {
    setLoading(true);
    setError(null);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://earthlixir-backend.vercel.app';
      const response = await axios.get<FAQ[]>(`${backendUrl}/api/faqs`);
      setFaqs(response.data.sort((a, b) => a.order - b.order));
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || 'Failed to fetch FAQs';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (faq?: FAQ) => {
    if (faq) {
      setEditingFaq(faq);
      setFormData({ question: faq.question, answer: faq.answer, order: faq.order });
    } else {
      setEditingFaq(null);
      setFormData({ question: '', answer: '', order: faqs.length + 1 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
    setFormData({ question: '', answer: '', order: 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://earthlixir-backend.vercel.app';
      const token = localStorage.getItem('accessToken');

      if (editingFaq) {
        await axios.patch(`${backendUrl}/api/faqs/${editingFaq.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('FAQ updated successfully!');
      } else {
        await axios.post(`${backendUrl}/api/faqs`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('FAQ created successfully!');
      }

      handleCloseModal();
      fetchFAQs();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || 'Failed to save FAQ';
      alert(errorMessage);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) {
      return;
    }
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://earthlixir-backend.vercel.app';
      const token = localStorage.getItem('accessToken');
      await axios.delete(`${backendUrl}/api/faqs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('FAQ deleted successfully!');
      fetchFAQs();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || 'Failed to delete FAQ';
      alert(errorMessage);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800">Manage FAQs</h1>
              <button
                onClick={() => handleOpenModal()}
                className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 font-semibold shadow-md"
              >
                + Add New FAQ
              </button>
            </div>

            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600 mb-4"></div>
                <p className="text-gray-700 text-lg">Loading FAQs...</p>
              </div>
            ) : error ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-red-600 text-lg">{error}</p>
                <button
                  onClick={fetchFAQs}
                  className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {faqs.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-gray-600 text-lg mb-4">No FAQs found.</p>
                    <button
                      onClick={() => handleOpenModal()}
                      className="inline-block bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
                    >
                      Add Your First FAQ
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {faqs.map((faq) => (
                      <div key={faq.id} className="p-6 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded mr-3">
                                Order: {faq.order}
                              </span>
                              <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                            </div>
                            <p className="text-gray-600 mt-2">{faq.answer}</p>
                          </div>
                          <div className="ml-4 flex space-x-3">
                            <button
                              onClick={() => handleOpenModal(faq)}
                              className="text-blue-600 hover:text-blue-900 font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(faq.id)}
                              className="text-red-600 hover:text-red-900 font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal for Create/Edit FAQ */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter the FAQ question"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Answer *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter the FAQ answer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Order *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="1, 2, 3, etc."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    {editingFaq ? 'Update FAQ' : 'Create FAQ'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFAQsPage;

