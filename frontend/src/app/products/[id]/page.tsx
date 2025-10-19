'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Import useParams
import Image from 'next/image';
import axios from 'axios';
import { Product } from '@/app/page';
import ReviewList from '@/components/ReviewList'; // Import ReviewList
import ReviewForm from '@/components/ReviewForm'; // Import ReviewForm

// Define the Review interface to match the backend Review entity
interface Review {
  id: string;
  rating: number;
  comment: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  guestName?: string;
  country: string;
  createdAt: string;
}

const ProductDetailPage = () => {
  const routerParams = useParams(); // Use useParams hook
  const id = routerParams.id as string; // Access id from routerParams and cast to string
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false); // New state for form visibility

  const [activeTab, setActiveTab] = useState('description'); // New state for active tab
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; // Define backendUrl here

  const fetchProductAndReviews = async () => {
    try {
      setLoading(true);
      // const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'; // REMOVED: Moved to component scope

      // Fetch product details
      const productResponse = await axios.get<Product>(`${backendUrl}/api/products/${id}`);
      setProduct(productResponse.data);

      // Fetch reviews for the product
      const reviewsResponse = await axios.get<Review[]>(`${backendUrl}/api/reviews/product/${id}`);
      setReviews(reviewsResponse.data);

      // Fetch average rating for the product
      const averageRatingResponse = await axios.get<{ averageRating: number }>(`${backendUrl}/api/reviews/product/${id}/average-rating`);
      setAverageRating(averageRatingResponse.data.averageRating);
    } catch (err) {
      console.error('Error fetching product or reviews:', err);
      setError('Failed to load product details or reviews.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductAndReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleReviewSubmitted = () => {
    fetchProductAndReviews(); // Re-fetch all data after a new review is submitted
    setShowReviewForm(false); // Hide the form after submission
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><p className="text-xl text-gray-700">Loading product details...</p></div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return <div className="flex justify-center items-center min-h-screen"><p className="text-xl text-gray-700">Product not found.</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Product Image */}
          <div className="relative w-full h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-md">
            <Image
              src={product.imageUrl?.startsWith('http') ? product.imageUrl : product.imageUrl?.replace('/images/', '/') || '/placeholder-image.jpg'}
              alt={product.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">{product.name}</h1>
            {product.flavor && <p className="text-gray-500 text-xl">Flavor: {product.flavor}</p>}
            {product.price !== undefined && product.price !== null && <p className="text-green-600 text-3xl font-bold">${Number(product.price).toFixed(2)}</p>}

            {product.shortDescription && <p className="text-gray-700 text-lg leading-relaxed">{product.shortDescription}</p>}

            {/* Tabs for Long Description, Health Benefits, Brewing Instructions, Disclaimer */}
            <div className="mt-8">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'description' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Description
                  </button>
                  {product.healthBenefits && product.healthBenefits.length > 0 && (
                    <button
                      onClick={() => setActiveTab('benefits')}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'benefits' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                      Health Benefits
                    </button>
                  )}
                  {product.brewingInstructions && product.brewingInstructions.length > 0 && (
                    <button
                      onClick={() => setActiveTab('brewing')}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'brewing' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                      Brewing Instructions
                    </button>
                  )}
                  {product.healthDisclaimer && (
                    <button
                      onClick={() => setActiveTab('disclaimer')}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'disclaimer' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                      Disclaimer
                    </button>
                  )}
                </nav>
              </div>
              <div className="mt-6 text-gray-800 leading-relaxed">
                {activeTab === 'description' && product.longDescription && (
                  <p>{product.longDescription}</p>
                )}
                {activeTab === 'benefits' && product.healthBenefits && (
                  <ul className="list-disc pl-5 space-y-2">
                    {product.healthBenefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'brewing' && product.brewingInstructions && (
                  <ul className="list-decimal pl-5 space-y-2">
                    {product.brewingInstructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'disclaimer' && product.healthDisclaimer && (
                  <p className="text-sm text-gray-600">{product.healthDisclaimer}</p>
                )}
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                className="flex-1 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
                disabled={!product.stock || product.stock === 0}
              >
                {product.stock && product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
              </button>
              <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Add to Wishlist
              </button>
            </div>

            {/* Reviews Section */}
            <div className="mt-10 pt-8 border-t border-gray-200 grid grid-cols-1 gap-8">
              <ReviewList reviews={reviews} averageRating={averageRating} />
              <div className="w-full">
                {!showReviewForm && (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Add Your Review
                  </button>
                )}
                {showReviewForm && (
                  <ReviewForm productId={id} onReviewSubmitted={handleReviewSubmitted} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
