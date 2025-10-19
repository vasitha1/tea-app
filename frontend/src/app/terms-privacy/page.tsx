import { FaLeaf, FaShieldAlt, FaGavel, FaUserShield, FaCookieBite, FaEnvelope } from 'react-icons/fa';

export default function TermsPrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">📋</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Terms & Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl text-green-50 max-w-3xl mx-auto">
            Your trust is important to us. Learn about our terms and how we protect your privacy.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Terms and Conditions Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaGavel className="text-green-600 text-2xl" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800">Terms and Conditions</h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Last Updated:</strong> 19/10/2025
              </p>
              
              <p className="text-lg text-gray-700 mb-6">
                Welcome to Earthlixir! These Terms and Conditions govern your use of our website and services related to the purchase of our tea products. By accessing or using our services, you agree to be bound by these Terms. If you do not agree, please do not use our services.
              </p>

              <div className="space-y-8">
                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    Acceptance of Terms
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    By placing an order or subscribing to our services, you confirm that you are at least 18 years old and have the legal capacity to enter into these Terms. If you are using the services on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    Product Information
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Earthlixir offers a variety of tea products, which may vary in flavors, types, and packaging. We strive for accuracy in product descriptions, pricing, and availability. However, we reserve the right to modify product details without prior notice.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    Ordering and Payment
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">3.1 Order Process</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Orders can be placed through our online platform or physical store.</li>
                        <li>By placing an order, you are making an offer to purchase a product, which we may accept or decline at our discretion.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">3.2 Payment</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>All payments must be made through secure payment processing methods as detailed on our website.</li>
                        <li>You agree to provide accurate billing information and authorize Earthlixir to charge your selected payment method for the total amount of your order.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    Subscription Services
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">4.1 Subscription Terms</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>By subscribing to our services, you agree to receive periodic tea deliveries as selected during the subscription process.</li>
                        <li>Subscriptions will automatically renew unless canceled at least 7 days prior to the renewal date.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">4.2 Cancellation</h4>
                      <p className="text-gray-700 leading-relaxed">
                        You may cancel your subscription at any time by following the cancellation instructions provided on our website.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                    Shipping and Delivery
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Shipping costs will be calculated at checkout and are based on the delivery location and selected shipping method.</li>
                    <li>Earthlixir is not liable for any delays in delivery due to unforeseen circumstances or third-party carriers.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                    Returns and Refunds
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">6.1 Return Policy</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>We accept returns of unopened products within 30 days of delivery. To initiate a return, please contact our customer service.</li>
                        <li>Refunds will be processed to the original payment method within 14 days after receiving the returned product.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">6.2 Damaged or Incorrect Items</h4>
                      <p className="text-gray-700 leading-relaxed">
                        If you receive a damaged or incorrect item, please contact us within 7 days so we can resolve the issue.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">7</span>
                    Intellectual Property
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    All content, trademarks, and logos on the Earthlixir website are owned by or licensed to Earthlixir. You may not reproduce, distribute, or create derivative works without our express written consent.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">8</span>
                    Limitation of Liability
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    To the maximum extent permitted by law, Earthlixir shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services or products.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">9</span>
                    Dispute Resolution
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">9.1 Governing Law</h4>
                      <p className="text-gray-700 leading-relaxed">
                        These Terms shall be governed by the laws of Cameroon.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">9.2 Arbitration</h4>
                      <p className="text-gray-700 leading-relaxed">
                        Any disputes arising from these Terms shall be resolved through binding arbitration in accordance with the rules of the Cameroon Arbitration Association, and the arbitration shall take place in Yaounde, Cameroon.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">10</span>
                    Changes to Terms
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Earthlixir reserves the right to modify these Terms at any time. We will notify you of any changes by posting the updated Terms on our website. Your continued use of our services after such changes constitutes your acceptance of the new Terms.
                  </p>
                </section>
              </div>
            </div>
          </div>

          {/* Privacy Policy Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaShieldAlt className="text-green-600 text-2xl" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800">Privacy Policy</h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                At Earthlixir, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.
              </p>

              <div className="space-y-8">
                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <FaUserShield className="text-green-600" />
                    Information We Collect
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Name, email address, and phone number when you create an account or place an order</li>
                        <li>Shipping and billing addresses for order fulfillment</li>
                        <li>Payment information (processed securely through our payment partners)</li>
                        <li>Communication preferences and customer service interactions</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">Usage Information</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Website usage patterns and preferences</li>
                        <li>Device information and browser type</li>
                        <li>IP address and location data (for security and analytics)</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <FaLeaf className="text-green-600" />
                    How We Use Your Information
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Process and fulfill your orders</li>
                    <li>Provide customer support and respond to inquiries</li>
                    <li>Send order confirmations, shipping updates, and important account information</li>
                    <li>Improve our website, products, and services</li>
                    <li>Send marketing communications (with your consent)</li>
                    <li>Prevent fraud and ensure security</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <FaCookieBite className="text-green-600" />
                    Cookies and Tracking
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-semibold">
                      Essential cookies are required for the website to function properly and cannot be disabled.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <FaShieldAlt className="text-green-600" />
                    Data Security
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Rights</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your account and data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Request a copy of your data</li>
                    <li>Withdraw consent for data processing</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Third-Party Services</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may share your information with trusted third-party service providers who assist us in operating our website, processing payments, shipping orders, or providing customer support. These partners are bound by confidentiality agreements and are prohibited from using your information for any other purpose.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Updates to Privacy Policy</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated policy on our website and updating the "Last Updated" date.
                  </p>
                </section>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <FaEnvelope className="text-3xl" />
                <h2 className="text-3xl font-bold">Questions About Our Terms or Privacy?</h2>
              </div>
              <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
                If you have any questions about these Terms and Conditions or our Privacy Policy, please don&apos;t hesitate to contact us.
              </p>
              <div className="space-y-4 text-lg">
                <div>
                  <span className="font-semibold">Email:</span>
                  <a href="mailto:contact@earthlixir.net" className="text-green-100 hover:text-white transition-colors ml-2">
                    contact@earthlixir.net
                  </a>
                </div>
                <div>
                  <span className="font-semibold">Phone:</span>
                  <a href="tel:+237677381617" className="text-green-100 hover:text-white transition-colors ml-2">
                    +237677381617
                  </a>
                </div>
                <div>
                  <span className="font-semibold">Address:</span>
                  <span className="text-green-100 ml-2">
                    6.261 Rue d&apos;antenne Mbankolo, Yaounde, Cameroun
                  </span>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href="/contact"
                  className="inline-block px-8 py-4 bg-white text-green-600 font-bold rounded-full hover:bg-green-50 transition-colors duration-300 shadow-lg transform hover:scale-105"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
