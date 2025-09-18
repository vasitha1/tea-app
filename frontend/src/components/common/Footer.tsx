import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-green-400 mb-4">Earthlixir</h3>
            <p className="text-gray-300 mb-4">
              Authentic African herbal teas crafted from the finest organic ingredients sourced directly from Cameroon's fertile highlands.
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
                <Link href="/reviews" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
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
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
                  Returns
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
                info@earthlixir.net
              </p>
              <p>
                <span className="font-medium">Phone:</span><br />
                +49 (176) 14379086
              </p>
              <p>
                <span className="font-medium">Address:</span><br />
                6.261 Rue d'antenne Mbankolo<br />
                Yaounde, Cameroun
              </p>
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