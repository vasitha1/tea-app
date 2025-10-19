/**
 * Utility function to construct API URLs properly
 * Handles trailing slashes to prevent double slashes in URLs
 */
export function getApiUrl(endpoint: string): string {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://earthlixir-backend.vercel.app';
  const cleanBackendUrl = backendUrl.replace(/\/$/, ''); // Remove trailing slash
  const finalUrl = `${cleanBackendUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  // Debug logging
  console.log('getApiUrl debug:', {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    backendUrl,
    cleanBackendUrl,
    endpoint,
    finalUrl
  });
  
  return finalUrl;
}

/**
 * Common API endpoints
 */
export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  REVIEWS: '/api/reviews',
  FAQS: '/api/faqs',
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    PROFILE: '/api/auth/profile',
  },
  ORDERS: '/api/orders',
  USERS: '/api/users',
  CONTACT: '/api/contact',
} as const;
