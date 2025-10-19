'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl, API_ENDPOINTS } from '@/utils/api';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className={`flex justify-between items-center w-full py-6 text-left font-semibold text-lg focus:outline-none transition-colors duration-200 ${
          isOpen ? 'text-green-600' : 'text-gray-800 hover:text-green-600'
        }`}
        onClick={onClick}
      >
        <span className="flex items-center">
          <span className={`mr-4 text-2xl transition-colors duration-200 ${isOpen ? 'text-green-600' : 'text-gray-400'}`}>
            {isOpen ? '−' : '+'}
          </span>
          {question}
        </span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180 text-green-600' : 'rotate-0 text-gray-400'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-6 pl-12 text-gray-700 leading-relaxed">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null); // State to manage which accordion item is open

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const response = await axios.get<FaqItem[]>(getApiUrl(API_ENDPOINTS.FAQS));
        setFaqs(response.data);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError('Failed to load FAQs.');
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const handleAccordionClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mb-4"></div>
          <p className="text-xl text-gray-700">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❓</div>
          <p className="text-xl text-red-500 font-semibold mb-2">Error Loading FAQs</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <div className="text-6xl">💬</div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl text-green-50 max-w-3xl mx-auto">
            Find answers to common questions about our teas, ordering, and more
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {faqs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-xl text-gray-600">No FAQs available at the moment.</p>
              <p className="text-gray-500 mt-2">Check back soon or contact us if you have questions!</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="mb-8 pb-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Got Questions?</h2>
                <p className="text-gray-600">
                  Click on any question below to view the answer. Can&apos;t find what you&apos;re looking for?{' '}
                  <a href="/contact" className="text-green-600 hover:text-green-700 font-semibold underline">
                    Contact us
                  </a>
                </p>
              </div>
              
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    onClick={() => handleAccordionClick(index)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Still Have Questions CTA */}
          <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl p-8 md:p-12 text-center shadow-xl">
            <h3 className="text-3xl font-bold mb-4">Still have questions?</h3>
            <p className="text-xl text-green-50 mb-6">
              Our team is here to help you find the perfect tea for your wellness journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-green-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg transform hover:scale-105"
              >
                Contact Us
              </a>
              <a
                href="/catalog"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-green-600 transition-all duration-300"
              >
                Browse Teas
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
