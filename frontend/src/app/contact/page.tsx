'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    reason: '',
    phoneNumber: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://earthlixir-backend.vercel.app';
      const response = await axios.post(`${backendUrl}/api/contact/submit`, formData);
      setSubmitStatus({ success: true, message: response.data.message });
      setFormData({ reason: '', phoneNumber: '', email: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus({ success: false, message: 'Failed to send your message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">💬</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-green-50 max-w-3xl mx-auto">
            We&apos;re here to answer your questions and help you on your wellness journey
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">Fill out the form below and we&apos;ll get back to you as soon as possible</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="reason" className="block text-sm font-semibold text-gray-700 mb-2">
                    Reason for Contact *
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    value={formData.reason}
                    onChange={handleChange}
                  >
                    <option value="">Select a reason...</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Question</option>
                    <option value="product">Product Information</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                {submitStatus && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitStatus.success
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}
                  >
                    <p className="font-semibold">{submitStatus.message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Info Cards */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FaEnvelope className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg mb-1">Email Us</h4>
                      <a href="mailto:contact@earthlixir.net" className="text-green-600 hover:text-green-700 transition-colors">
                        contact@earthlixir.net
                      </a>
                      <p className="text-gray-600 text-sm mt-1">We&apos;ll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FaPhone className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg mb-1">Call Us</h4>
                      <a href="tel:+4917614379086" className="text-green-600 hover:text-green-700 transition-colors">
                        +49 (176) 14379086
                      </a>
                      <p className="text-gray-600 text-sm mt-1">Mon-Fri, 9am-6pm CET</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FaMapMarkerAlt className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg mb-1">Visit Us</h4>
                      <p className="text-gray-700">
                        6.261 Rue d&apos;antenne Mbankolo<br />
                        Yaounde, Cameroun
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
                <p className="text-green-50 mb-6">
                  Stay connected for wellness tips, new products, and exclusive offers
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/earth_lixir?igsh=anFveng4YWI5OWNn&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-full hover:bg-green-50 transition-all duration-300 shadow-lg transform hover:scale-105 font-semibold"
                  >
                    <FaInstagram className="text-xl" />
                    Instagram
                  </a>
                  <a
                    href="https://www.tiktok.com/@earth_lixir?_t=ZN-90HI3IVKRBm&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-full hover:bg-green-50 transition-all duration-300 shadow-lg transform hover:scale-105 font-semibold"
                  >
                    <FaTiktok className="text-xl" />
                    TikTok
                  </a>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-3">❓</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Have a Question?</h3>
                <p className="text-gray-600 mb-4">Check out our FAQ page for quick answers</p>
                <a
                  href="/faq"
                  className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-md"
                >
                  View FAQ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
