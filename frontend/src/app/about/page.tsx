import Image from 'next/image';
import { FaInstagram, FaTiktok, FaLeaf, FaHeart, FaUsers, FaRecycle, FaSeedling, FaGlobeAfrica } from 'react-icons/fa';

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
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-green-50 leading-relaxed">
              Proudly Made in Cameroon, Inspired by Africa, Loved Worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Our Story */}
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
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Earthlixir is a tea brand that believes wellness begins with what nature provides. Born in the heart of Cameroon, our brand is dedicated to creating premium herbal teas that nourish the body, calm the mind, and celebrate the healing richness of Africa&apos;s soil.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our blends, which are hibiscus, fevergrass, ginger, cinnamon, and cloves are carefully sourced from local farmers who practice sustainable and organic methods of farming. Every cup of Earthlixir tells a story of community, culture, and care for a healthy lifestyle.
              </p>
            </div>
          </div>

          {/* Movement Section */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl p-8 md:p-12 mb-20">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">A Movement Toward Conscious Living</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We are not just a tea brand, we are a movement toward conscious living. Our mission is to help people embrace a healthy lifestyle through natural African ingredients, while empowering small farmers holders and promoting eco-friendly production.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you&apos;re seeking relaxation, detoxification, or daily vitality, Earthlixir offers you an authentic taste of Africa&apos;s natural wellness — straight from the earth to your cup.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What Sets Us Apart</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <FaLeaf className="text-3xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">100% Natural & Locally Sourced</h3>
                <p className="text-gray-600">
                  No preservatives, no additives, just nature&apos;s purest essence.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <FaRecycle className="text-3xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Eco-Friendly Packaging</h3>
                <p className="text-gray-600">
                  Because caring for the earth is part of our identity.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <FaUsers className="text-3xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Empowering Communities</h3>
                <p className="text-gray-600">
                  We partner directly with Cameroonian farmers to support local economies and promote sustainable agriculture.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <FaHeart className="text-3xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Wellness with Purpose</h3>
                <p className="text-gray-600">
                  Every blend is designed to restore balance, energy, and peace in your everyday life.
                </p>
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">More Than a Drink</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                At Earthlixir, we see tea as more than a drink — it&apos;s a daily ritual of healing, mindfulness, and connection to nature. Each infusion is crafted to help you slow down, breathe deeply, and reconnect with what truly matters: your health and the earth that sustains it.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                From our family to yours, Earthlixir invites you to discover the profound benefits of teas steeped in tradition, grown with love, and crafted for a healthier, more balanced you.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <FaSeedling className="text-green-600" />
                  <span className="font-semibold text-green-700">Sustainable</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <span className="text-2xl">🤝</span>
                  <span className="font-semibold text-green-700">Ethical</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <FaGlobeAfrica className="text-green-600" />
                  <span className="font-semibold text-green-700">African Heritage</span>
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
                      <a href="tel:+237677381617" className="text-green-100 hover:text-white transition-colors">
                        +237677381617
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
