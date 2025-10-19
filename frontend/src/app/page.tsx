'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import ProductShowcaseCard from '@/components/ProductShowcaseCard';

// Define Product interface to match backend
export interface Product {
  id: string;
  name: string;
  flavor?: string;
  shortDescription?: string;
  longDescription?: string;
  healthBenefits?: string[];
  brewingInstructions?: string[];
  healthDisclaimer?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
}

// Define types for features and testimonials
interface Feature {
  title: string;
  description: string;
  image: string;
  alt: string;
}

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

// Define animation options interface
interface AnimationOptions {
  triggerOnce: boolean;
  threshold: number;
}

// Counter animation hook
const useCounter = (end: number, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number;
    let animationFrame: number | null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      if (end === 4.9) {
        setCount(Math.round((progress * end) * 10) / 10);
      } else {
        setCount(Math.round(progress * end));
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, shouldStart]);

  return count;
};

// Helper component for animated product cards
const AnimatedProductCard = ({ product, index, animationOptions }: { product: Product; index: number; animationOptions: AnimationOptions; }) => {
  const { ref, inView } = useInView(animationOptions);
  return (
    <div
      ref={ref}
      className={`w-full md:w-auto md:max-w-sm transform hover:scale-105 transition-all duration-700 delay-[${(index + 1) * 100}ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <ProductShowcaseCard product={product} />
    </div>
  );
};

// Helper component for animated features
const AnimatedFeature = ({ feature, index, animationOptions }: { feature: Feature; index: number; animationOptions: AnimationOptions; }) => {
  const { ref, inView } = useInView(animationOptions);
  return (
    <div
      ref={ref}
      className={`flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-12 lg:gap-20 transition-all duration-700 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Content */}
      <div className="flex-1 text-center lg:text-left w-full">
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-white/30 hover:bg-white/80 transition-all duration-300">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-800 mb-4 sm:mb-6 leading-tight">
            {feature.title}
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
      {/* Image */}
      <div className="flex-1 w-full">
        <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
          <Image
            src={feature.image}
            alt={feature.alt}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

// Helper component for animated testimonials
const AnimatedTestimonial = ({ review, animationOptions }: { review: Review; animationOptions: AnimationOptions; }) => {
  const { ref, inView } = useInView(animationOptions);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="flex items-center mb-6">
        {renderStars(review.rating)}
      </div>
      <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 italic">
        {`"${review.comment}"`}
      </blockquote>
      <div className="flex items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 bg-green-100 flex items-center justify-center">
          <span className="text-green-600 text-xl font-bold">
            {review.user 
              ? review.user.firstName.charAt(0).toUpperCase() 
              : review.guestName?.charAt(0).toUpperCase() || '?'}
          </span>
        </div>
        <div>
          <div className="font-semibold text-gray-800 text-lg">
            {review.user ? `${review.user.firstName} ${review.user.lastName}` : review.guestName}
          </div>
          <div className="text-gray-500 text-sm">{review.country}</div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [titleAnimated, setTitleAnimated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const animationOptions: AnimationOptions = {
    triggerOnce: true,
    threshold: 0.1,
  };

  const { ref: heroRef, inView: heroInView } = useInView(animationOptions);
  const { ref: productsRef } = useInView(animationOptions);
  const { ref: natureContentRef, inView: natureContentInView } = useInView(animationOptions);
  const { ref: featuresHeaderRef, inView: featuresHeaderInView } = useInView(animationOptions);
  const { ref: featuresCtaRef, inView: featuresCtaInView } = useInView(animationOptions);
  const { ref: testimonialsHeaderRef, inView: testimonialsHeaderInView } = useInView(animationOptions);
  const { ref: trustIndicatorsRef, inView: trustIndicatorsInView } = useInView(animationOptions);

  useEffect(() => {
    if (heroInView && !titleAnimated) {
      setTitleAnimated(true);
    }
  }, [heroInView, titleAnimated]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Use production backend URL for mobile compatibility
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://earthlixir-backend.vercel.app';
        console.log('Environment check:', {
          NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
          backendUrl: backendUrl,
          isClient: typeof window !== 'undefined'
        });
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(`${backendUrl}/api/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store', // Important for iOS
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Products fetched successfully:', data.length);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        if (error instanceof Error && error.name === 'AbortError') {
          console.error('Request timed out after 10 seconds');
        }
        // Set empty array as fallback
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Use production backend URL for mobile compatibility
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://earthlixir-backend.vercel.app';
        console.log('Reviews Environment check:', {
          NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
          backendUrl: backendUrl,
          isClient: typeof window !== 'undefined'
        });
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(`${backendUrl}/api/reviews`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store', // Important for iOS
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Reviews fetched successfully:', data.length);
        setReviews(data.slice(0, 6)); // Limit to 6 reviews
      } catch (error) {
        console.error('Error fetching reviews:', error);
        if (error instanceof Error && error.name === 'AbortError') {
          console.error('Reviews request timed out after 10 seconds');
        }
        // Set empty array as fallback
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchReviews();
  }, []);

  const customersCount = useCounter(10000, 2000, heroInView);
  const rating = useCounter(4.9, 2000, heroInView);
  const percentage = useCounter(100, 2000, heroInView);

  const features: Feature[] = [
    {
      title: "100% Natural",
      description: "Pure, organic botanicals sourced directly from Cameroon's fertile lands",
      image: "/100natural.jpg",
      alt: "Natural organic herbs"
    },
    {
      title: "Caffeine-Free",
      description: "Perfect for any time of day, supporting relaxation and wellness",
      image: "/caffeine-free.jpeg",
      alt: "Relaxing herbal tea"
    },
    {
      title: "Traditional Wisdom",
      description: "Authentic African herbal traditions passed down through generations",
      image: "/traditional-wisdom.jpeg",
      alt: "Traditional African herbs"
    },
    {
      title: "Premium Quality",
      description: "Carefully selected and expertly blended for maximum health benefits",
      image: "/premium-quality.jpg",
      alt: "Premium tea quality"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <section
        className="relative w-full min-h-[600px] md:h-[500px] bg-cover bg-center flex items-center pt-20 md:pt-0"
        style={{ backgroundImage: 'url(/hero_background.jpg)' }}
      >
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-0">
          <div
            ref={heroRef}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="text-black space-y-4 md:space-y-6 lg:pr-6">
              <div className="space-y-3 md:space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
                  Discover the Power of
                  <span className="text-green-600 block">African Botanical Wisdom</span>
                </h1>
                <p className="text-lg sm:text-xl leading-relaxed drop-shadow-md text-gray-700">
                  Authentic herbal teas crafted from the finest organic ingredients sourced directly from Cameroon&apos;s fertile highlands
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="inline-block px-3 py-1.5 bg-green-600/80 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                    ✓ 100% Organic
                  </span>
                  <span className="inline-block px-3 py-1.5 bg-green-600/80 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                    ✓ Caffeine-Free
                  </span>
                  <span className="inline-block px-3 py-1.5 bg-green-600/80 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                    ✓ Traditional Recipe
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="/catalog"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-300"
                >
                  Shop Now
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold rounded-xl transition-all duration-300"
                >
                  Learn Our Story
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-300">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">
                    {customersCount >= 10000 ? '10K+' : `${Math.round(customersCount / 1000)}K+`}
                  </div>
                  <div className="text-xs text-gray-700">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">
                    ★ {rating.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-700">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">{percentage}%</div>
                  <div className="text-xs text-gray-700">Natural & Organic</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end mt-6 lg:mt-0">
              <div className="relative w-full max-w-2xl h-[250px] sm:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/hero.jpg"
                  alt="Premium organic herbal tea collection from Cameroon"
                  fill
                  priority={true}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="max-w-6xl mx-auto w-full">
            <div ref={productsRef} className="max-w-6xl mx-auto">
              {loadingProducts ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600 mb-4"></div>
                  <p className="text-gray-700 text-lg">Loading our tea collection...</p>
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8`}>
                    {products.slice(0, 3).map((product, index) => (
                      <AnimatedProductCard
                        key={product.id}
                        product={product}
                        index={index}
                        animationOptions={animationOptions}
                      />
                    ))}
                  </div>
                  <div className="flex justify-center gap-8 flex-wrap">
                    {products.slice(3).map((product, index) => (
                      <AnimatedProductCard
                        key={product.id}
                        product={product}
                        index={index + 3}
                        animationOptions={animationOptions}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-700 text-lg">No products available.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Nature Divider Section */}
      <section
        className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url(/nature_bg.jpg)', backgroundPosition: 'bottom' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-black/40"></div>
        <div
          ref={natureContentRef}
          className={`relative z-10 text-center text-white px-6 max-w-3xl mx-auto transition-all duration-700 ${natureContentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
            From Cameroon&apos;s Heart to Your Cup
          </h3>
          <p className="text-lg md:text-xl leading-relaxed drop-shadow-md">
            Every leaf tells a story of ancient wisdom, sustainable harvesting, and the healing power of nature&apos;s finest botanicals.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #d1fae5 0%, #a7f3d0 30%, #ffffff 100%)' }}
        ></div>
        <div className="relative z-10 container mx-auto py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div
            ref={featuresHeaderRef}
            className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-700 ${featuresHeaderInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 drop-shadow-sm px-4">
              Why Choose Earthlixir?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
              Experience the perfect blend of nature&apos;s wisdom and modern wellness, backed by generations of African herbal expertise
            </p>
          </div>
          <div className="space-y-12 sm:space-y-16 md:space-y-24">
            {features.map((feature, index) => (
              <AnimatedFeature
                key={feature.title}
                feature={feature}
                index={index}
                animationOptions={animationOptions}
              />
            ))}
          </div>
          <div
            ref={featuresCtaRef}
            className={`text-center mt-12 sm:mt-16 md:mt-24 transition-all duration-700 ${featuresCtaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 max-w-3xl mx-auto shadow-2xl border border-white/30">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-800 mb-4 sm:mb-6">
                Ready to Transform Your Wellness Journey?
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
                Join thousands of satisfied customers who have discovered the power of authentic African herbal traditions
              </p>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-sm sm:text-base"
              >
                Explore Our Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #f8fffe, #ffffff, #f0f9ff)' }}
        ></div>
        <div className="relative z-10 container mx-auto">
          <div
            ref={testimonialsHeaderRef}
            className={`text-center mb-20 transition-all duration-700 ${testimonialsHeaderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover why thousands of people worldwide trust Earthlixir for their daily wellness routine
            </p>
          </div>
          {loadingReviews ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600 mb-4"></div>
              <p className="text-gray-700 text-lg">Loading testimonials...</p>
            </div>
          ) : reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {reviews.map((review) => (
                <AnimatedTestimonial
                  key={review.id}
                  review={review}
                  animationOptions={animationOptions}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-700 text-lg mb-16">No reviews yet. Be the first to review our products!</p>
          )}
          <div
            ref={trustIndicatorsRef}
            className={`text-center transition-all duration-700 ${trustIndicatorsInView ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="bg-green-50 rounded-2xl p-10 max-w-4xl mx-auto border border-green-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">4.9/5</div>
                  <div className="text-gray-600">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                  <div className="text-gray-600">Would Recommend</div>
                </div>
              </div>
              <div className="mt-10">
                <p className="text-gray-700 text-lg mb-6">
                  Connect with us on social media for wellness tips, exclusive offers, and daily inspiration
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://www.instagram.com/earth_lixir?igsh=anFveng4YWI5OWNn&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-300 shadow-lg gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Follow on Instagram
                  </a>
                  <a
                    href="https://www.tiktok.com/@earth_lixir?_t=ZN-90HI3IVKRBm&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg transition-colors duration-300 gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    Follow on TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
