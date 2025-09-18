'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { products } from '@/data/products';
import ProductShowcaseCard from '@/components/ProductShowcaseCard';

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
        // Special handling for rating (4.9)
        setCount(Math.round((progress * end) * 10) / 10);
      } else if (end === 100) {
        // For percentages
        setCount(Math.round(progress * end));
      } else if (end >= 10000) {
        // For large numbers like 10K+
        setCount(Math.round(progress * end));
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

export default function Home() {
  const [titleAnimated, setTitleAnimated] = useState(false);

  const animationOptions = {
    triggerOnce: true,
    threshold: 0.1,
  };

  const { ref: heroRef, inView: heroInView } = useInView(animationOptions);
  const { ref: productsHeaderRef, inView: productsHeaderInView } = useInView(animationOptions);
  const { ref: natureContentRef, inView: natureContentInView } = useInView(animationOptions);
  const { ref: featuresHeaderRef, inView: featuresHeaderInView } = useInView(animationOptions);
  const { ref: featuresCtaRef, inView: featuresCtaInView } = useInView(animationOptions);
  const { ref: testimonialsHeaderRef, inView: testimonialsHeaderInView } = useInView(animationOptions);
  const { ref: trustIndicatorsRef, inView: trustIndicatorsInView } = useInView(animationOptions);

  // Trigger title animation when hero comes into view
  useEffect(() => {
    if (heroInView && !titleAnimated) {
      setTitleAnimated(true);
    }
  }, [heroInView, titleAnimated]);

  // Counter animations for trust indicators
  const customersCount = useCounter(10000, 2000, heroInView);
  const rating = useCounter(4.9, 2000, heroInView);
  const percentage = useCounter(100, 2000, heroInView);

  const features = [
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

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "Earthlixir teas have completely transformed my evening routine. The Moringa blend helps me unwind after long days, and I love knowing I'm supporting sustainable practices.",
      image: "/hero.jpg"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      location: "Toronto, Canada",
      rating: 5,
      text: "As a healthcare professional, I appreciate the authentic traditional formulations. The quality is exceptional and my patients have noticed real improvements in their wellness.",
      image: "/hero.jpg"
    },
    {
      id: 3,
      name: "Amara Okafor",
      location: "London, UK",
      rating: 5,
      text: "Finally, authentic African herbal teas that remind me of home! The flavors are rich and the health benefits are noticeable. Earthlixir has become my daily ritual.",
      image: "/hero.jpg"
    },
    {
      id: 4,
      name: "James Rodriguez",
      location: "Los Angeles, USA",
      rating: 5,
      text: "I've tried many herbal tea brands, but nothing compares to Earthlixir. The traditional wisdom combined with premium quality makes every cup a healing experience.",
      image: "/hero.jpg"
    },
    {
      id: 5,
      name: "Elena Petrov",
      location: "Berlin, Germany",
      rating: 5,
      text: "The customer service is amazing and the teas are life-changing. I've been recommending Earthlixir to everyone I know. It's more than tea - it's wellness in a cup.",
      image: "/hero.jpg"
    },
    {
      id: 6,
      name: "Ahmad Hassan",
      location: "Dubai, UAE",
      rating: 5,
      text: "Earthlixir represents the best of African botanical heritage. The teas are potent, pure, and have helped improve my digestion and overall energy levels significantly.",
      image: "/hero.jpg"
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <section
        className="relative w-full h-[500px] bg-cover bg-center flex items-center mt-35 md:mt-0"
        style={{ backgroundImage: 'url(/hero_background.jpg)' }}
      >
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-white/85"></div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            ref={heroRef}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Left Content - Text and CTAs */}
            <div className="text-black space-y-6 lg:pr-6">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
                  Discover the Power of
                  <span className="text-green-400 block">African Botanical Wisdom</span>
                </h1>
                
                <p className="text-lg sm:text-xl leading-relaxed drop-shadow-md text-gray-700">
                  Authentic herbal teas crafted from the finest organic ingredients sourced directly from Cameroon's fertile highlands
                </p>
                
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="inline-block px-3 py-1.5 bg-green-600/80 backdrop-blur-sm rounded-full text-sm font-semibold">
                    ✓ 100% Organic
                  </span>
                  <span className="inline-block px-3 py-1.5 bg-green-600/80 backdrop-blur-sm rounded-full text-sm font-semibold">
                    ✓ Caffeine-Free
                  </span>
                  <span className="inline-block px-3 py-1.5 bg-green-600/80 backdrop-blur-sm rounded-full text-sm font-semibold">
                    ✓ Traditional Recipe
                  </span>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/80 text-white hover:bg-white hover:text-gray-900 font-bold rounded-xl transition-all duration-300 backdrop-blur-sm"
                >
                  Learn Our Story
                </Link>
              </div>

              {/* Trust Indicators with Counter Animation */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/20">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">
                    {customersCount >= 10000 ? '10K+' : `${Math.round(customersCount / 1000)}K+`}
                  </div>
                  <div className="text-xs text-gray-700">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">
                    ★ {rating.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-700">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">{percentage}%</div>
                  <div className="text-xs text-gray-700">Natural & Organic</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image (Wider but Less Tall) */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-2xl h-[300px] lg:h-[350px] rounded-2xl overflow-hidden shadow-2xl">
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
      {/* Products Section - Enhanced with scroll animations */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #ffffff, #f0f9ff, #e0f7fa)',
          }}
        ></div>

        <div className="relative z-10 flex flex-col items-center justify-center">
          <div
            ref={productsHeaderRef}
            className={`text-center mb-16 transition-all duration-700 ${productsHeaderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Handcrafted Organic Herbal Teas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Each blend is carefully sourced and crafted to bring you the purest essence of African botanical wisdom
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* First row - 3 items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {products.slice(0, 3).map((product, index) => {
                const { ref, inView } = useInView(animationOptions);
                return (
                  <div
                    ref={ref}
                    key={product.id}
                    className={`transform hover:scale-105 transition-all duration-700 delay-[${(index + 1) * 100}ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  >
                    <ProductShowcaseCard product={product} />
                  </div>
                );
              })}
            </div>

            {/* Second row - remaining items centered */}
            {products.length > 3 && (
              <div className="flex justify-center gap-8 flex-wrap">
                {products.slice(3).map((product, index) => {
                  const { ref, inView } = useInView(animationOptions);
                  return (
                    <div
                      ref={ref}
                      key={product.id}
                      className={`w-full md:w-auto md:max-w-sm transform hover:scale-105 transition-all duration-700 delay-[${(index + 1) * 100}ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                      <ProductShowcaseCard product={product} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Nature Divider Section - Enhanced with animations */}
      <section
        className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url(/nature_bg.jpg)' }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div
          ref={natureContentRef}
          className={`relative z-10 text-center text-white px-6 max-w-3xl mx-auto transition-all duration-700 ${natureContentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
            From Cameroon's Heart to Your Cup
          </h3>
          <p className="text-lg md:text-xl leading-relaxed drop-shadow-md">
            Every leaf tells a story of ancient wisdom, sustainable harvesting, and the healing power of nature's finest botanicals.
          </p>
        </div>
      </section>

      {/* Features Section - Enhanced with scroll animations */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #f0fff4 0%, #e6f7f1 50%, #dcf4f0 100%)'
          }}
        ></div>

        <div className="relative z-10 container mx-auto py-24 px-4">
          <div
            ref={featuresHeaderRef}
            className={`text-center mb-20 transition-all duration-700 ${featuresHeaderInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 drop-shadow-sm">
              Why Choose Earthlixir?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Experience the perfect blend of nature's wisdom and modern wellness, backed by generations of African herbal expertise
            </p>
          </div>

          <div className="space-y-24">
            {features.map((feature, index) => {
              const { ref, inView } = useInView(animationOptions);
              return (
                <div
                  ref={ref}
                  key={feature.title}
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 transition-all duration-700 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                  {/* Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-10 shadow-lg border border-white/30 hover:bg-white/80 transition-all duration-300">
                      <h3 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-6 leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex-1">
                    <div className="relative w-full h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
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
            })}
          </div>

          {/* Call to Action */}
          <div
            ref={featuresCtaRef}
            className={`text-center mt-24 transition-all duration-700 ${featuresCtaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-10 max-w-3xl mx-auto shadow-2xl border border-white/30">
              <h3 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-6">
                Ready to Transform Your Wellness Journey?
              </h3>
              <p className="text-xl text-gray-700 mb-10 leading-relaxed">
                Join thousands of satisfied customers who have discovered the power of authentic African herbal traditions
              </p>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-10 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Explore Our Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section - Enhanced with scroll animations */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #f8fffe, #ffffff, #f0f9ff)',
          }}
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

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial) => {
              const { ref, inView } = useInView(animationOptions);
              return (
                <div
                  ref={ref}
                  key={testimonial.id}
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                    &quot;{testimonial.text}&quot;
                  </blockquote>

                  {/* Customer Info */}
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 bg-green-100">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Indicators */}
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
                  Join our community of wellness enthusiasts and experience the difference
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/catalog"
                    className="inline-flex items-center justify-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-300 shadow-lg"
                  >
                    Start Your Journey
                  </Link>
                  <Link
                    href="/reviews"
                    className="inline-flex items-center justify-center px-8 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Read All Reviews
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}