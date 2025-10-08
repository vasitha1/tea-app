import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-emerald-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image 
                src="/Earthlixir Logo-02.jpg" 
                alt="Earthlixir Logo" 
                width={180} 
                height={60} 
                className="object-contain"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Authentic African herbal teas crafted from the finest organic ingredients sourced directly from Cameroon&apos;s fertile highlands.
            </p>
            <div className="flex space-x-2">
              <span className="inline-block px-2 py-1 bg-green-600 rounded text-xs">100% Organic</span>
              <span className="inline-block px-2 py-1 bg-green-600 rounded text-xs">Caffeine-Free</span>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/cameroonian-reviews" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          {/* Customer Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Get in Touch</h4>
            <div className="space-y-3 text-gray-300">
              <p>
                <span className="font-medium">Email:</span><br />
                contact@earthlixir.net
              </p>
              <p>
                <span className="font-medium">Phone:</span><br />
                +49 (176) 14379086
              </p>
              <p>
                <span className="font-medium">Address:</span><br />
                6.261 Rue d&apos;antenne Mbankolo<br />
                Yaounde, Cameroun
              </p>
            </div>
            {/* Social Media Links */}
            <div className="mt-6">
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/earth_lixir?igsh=anFveng4YWI5OWNn&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
                  <FaInstagram size={24} />
                </a>
                <a href="https://www.tiktok.com/@earth_lixir?_t=ZN-90HI3IVKRBm&_r=1" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
                  <FaTiktok size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Earthlixir. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}