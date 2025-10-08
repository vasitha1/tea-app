import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 bg-white text-gray-800 shadow-md z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 transition-colors duration-300">
          <Image src="/logocup1.jpg" alt="Earthlixir Cup Logo" width={30} height={30} className="rounded-full" />
          <Image src="/logo.jpg" alt="Earthlixir Logo" width={100} height={40} />
        </Link>
        
        {/* Navigation Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300">
            Home
          </Link>
          <Link href="/catalog" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300">
            Products
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300">
            About Us
          </Link>
          <Link href="/cameroonian-reviews" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300">
            Reviews
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300">
            Contact
          </Link>
          <Link href="/faq" className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300">
            FAQ
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600"
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md font-medium transition-colors duration-300">
              Home
            </Link>
            <Link href="/catalog" className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md font-medium transition-colors duration-300">
              Products
            </Link>
            <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md font-medium transition-colors duration-300">
              About Us
            </Link>
            <Link href="/cameroonian-reviews" className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md font-medium transition-colors duration-300">
              Reviews
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md font-medium transition-colors duration-300">
              Contact
            </Link>
            <Link href="/faq" className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md font-medium transition-colors duration-300">
              FAQ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}