import Image from 'next/image';
import { FaInstagram, FaTiktok, FaLeaf, FaHeart, FaUsers, FaAward } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'url(/hero_background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-green-50 leading-relaxed">
              From the fertile highlands of Cameroon to your cup - a journey of tradition, wellness, and authenticity
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/hero.jpg"
                alt="Earthlixir Tea Farm"
                fill
                style={{ objectFit: 'cover' }}
                className="hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Beginning</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Earthlixir began with a passion for natural wellness and a deep respect for the traditional herbal wisdom of Cameroon. Our founders, inspired by generations of family knowledge and the vibrant botanicals of their homeland, set out to share these potent, pure teas with the world.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe in the power of nature to heal, uplift, and bring balance to daily life. Every leaf and herb in our blends is ethically sourced, hand-picked, and carefully prepared to preserve its natural potency and flavor.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <FaLeaf className="text-3xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">100% Natural</h3>
                <p className="text-gray-600">
                  Pure, organic botanicals with no artificial additives or preservatives
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <FaHeart className="text-3xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Wellness First</h3>
                <p className="text-gray-600">
                  Every blend crafted with your health and well-being in mind
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <FaUsers className="text-3xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Fair Trade</h3>
                <p className="text-gray-600">
                  Direct partnerships with local farmers ensuring fair wages
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <FaAward className="text-3xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Quality</h3>
                <p className="text-gray-600">
                  Premium selection and expert blending for maximum benefits
                </p>
              </div>
            </div>
          </div>

          {/* Commitment Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Commitment</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We work directly with local farmers in Cameroon, ensuring fair wages and sustainable harvesting practices that protect both the environment and their communities.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our journey is one of authenticity, quality, and commitment to your well-being. From our family to yours, Earthlixir invites you to discover the profound benefits of teas steeped in tradition, grown with love, and crafted for a healthier, more balanced you.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <span className="text-2xl">🌱</span>
                  <span className="font-semibold text-green-700">Sustainable</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <span className="text-2xl">🤝</span>
                  <span className="font-semibold text-green-700">Ethical</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <span className="text-2xl">💚</span>
                  <span className="font-semibold text-green-700">Community-Focused</span>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2">
              <Image
                src="/traditional-wisdom.jpeg"
                alt="Traditional Wisdom"
                fill
                style={{ objectFit: 'cover' }}
                className="hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
                <p className="text-xl text-green-50 mb-8">
                  Have questions about our teas, your order, or just want to say hello? We&apos;d love to hear from you!
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📧</div>
                    <div>
                      <div className="font-semibold text-lg">Email</div>
                      <a href="mailto:contact@earthlixir.net" className="text-green-100 hover:text-white transition-colors">
                        contact@earthlixir.net
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📞</div>
                    <div>
                      <div className="font-semibold text-lg">Phone</div>
                      <a href="tel:+4917614379086" className="text-green-100 hover:text-white transition-colors">
                        +49 (176) 14379086
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📍</div>
                    <div>
                      <div className="font-semibold text-lg">Address</div>
                      <p className="text-green-100">
                        6.261 Rue d&apos;antenne Mbankolo<br />
                        Yaounde, Cameroun
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold mb-6">Follow Our Journey</h3>
                <p className="text-xl text-green-50 mb-6">
                  Stay connected with us on social media for tea tips, wellness advice, and behind-the-scenes glimpses
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/earth_lixir?igsh=anFveng4YWI5OWNn&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white text-green-600 px-6 py-4 rounded-xl hover:bg-green-50 transition-all duration-300 shadow-lg transform hover:scale-105"
                  >
                    <FaInstagram className="text-2xl" />
                    <span className="font-semibold">Instagram</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@earth_lixir?_t=ZN-90HI3IVKRBm&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white text-green-600 px-6 py-4 rounded-xl hover:bg-green-50 transition-all duration-300 shadow-lg transform hover:scale-105"
                  >
                    <FaTiktok className="text-2xl" />
                    <span className="font-semibold">TikTok</span>
                  </a>
                </div>
                <div className="mt-8">
                  <a
                    href="/contact"
                    className="inline-block px-8 py-4 bg-white text-green-600 font-bold rounded-full hover:bg-green-50 transition-colors duration-300 shadow-lg transform hover:scale-105"
                  >
                    Send Us a Message
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
