// SEO Metadata configuration for pages

export const homeMetadata = {
  title: 'Premium African Herbal Tea from Cameroon',
  description: 'Earthlixir offers 100% natural, organic herbal tea blends from Cameroon. Discover hibiscus, lemongrass, ginger, cinnamon & cloves. Wellness teas crafted with African tradition. Free shipping available.',
  keywords: 'Cameroonian tea, African herbal tea, organic tea, hibiscus tea, lemongrass tea, ginger tea, wellness tea, buy tea online, natural tea Cameroon',
  openGraph: {
    title: 'Earthlixir - Premium African Herbal Tea from Cameroon',
    description: 'Discover 100% natural, organic herbal tea blends. Shop premium wellness teas from Cameroon.',
    images: ['/hero.jpg'],
  },
};

export const catalogMetadata = {
  title: 'Shop Premium Herbal Tea Blends',
  description: 'Browse our collection of authentic Cameroonian herbal teas. Hibiscus, lemongrass, ginger, cinnamon & cloves blends. 100% natural, organic, eco-friendly packaging. Shop now.',
  keywords: 'buy herbal tea, organic tea shop, Cameroonian tea blends, hibiscus tea buy, lemongrass tea buy, wellness tea shop',
};

export const aboutMetadata = {
  title: 'About Earthlixir - Our Story & Mission',
  description: 'Learn about Earthlixir, a Cameroonian tea brand dedicated to natural wellness. We source organic herbs from local farmers, support communities, and promote eco-friendly practices.',
  keywords: 'Earthlixir about, Cameroonian tea brand, organic tea company, sustainable tea, African tea company',
};

export const contactMetadata = {
  title: 'Contact Us - Get in Touch',
  description: 'Contact Earthlixir for questions about our herbal teas, orders, or wholesale inquiries. Email: contact@earthlixir.net | Phone: +49 (176) 14379086',
  keywords: 'contact Earthlixir, tea wholesale, customer service, buy Cameroonian tea',
};

export const reviewsMetadata = {
  title: 'Customer Reviews - What People Say About Our Tea',
  description: 'Read authentic reviews from our customers worldwide. Discover why people love Earthlixir\'s premium Cameroonian herbal teas. 5-star ratings for quality and taste.',
  keywords: 'Earthlixir reviews, tea reviews, customer testimonials, herbal tea ratings',
};

export const faqMetadata = {
  title: 'FAQ - Frequently Asked Questions',
  description: 'Find answers to common questions about our teas, shipping, ingredients, brewing instructions, and more. Learn about Earthlixir\'s natural herbal tea blends.',
  keywords: 'tea FAQ, herbal tea questions, brewing instructions, tea benefits, shipping information',
};

// Structured Data (JSON-LD) for Organization
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Earthlixir',
  description: 'Premium African herbal tea brand from Cameroon offering 100% natural, organic tea blends.',
  url: 'https://earthlixir.net',
  logo: 'https://earthlixir.net/logo.jpg',
  image: 'https://earthlixir.net/hero.jpg',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+49-176-14379086',
    contactType: 'Customer Service',
    email: 'contact@earthlixir.net',
    areaServed: 'Worldwide',
    availableLanguage: ['English'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '6.261 Rue d\'antenne Mbankolo',
    addressLocality: 'Yaounde',
    addressCountry: 'CM',
  },
  sameAs: [
    'https://www.instagram.com/earth_lixir',
    'https://www.tiktok.com/@earth_lixir',
  ],
  founder: {
    '@type': 'Person',
    name: 'Earthlixir Team',
  },
};

// Structured Data for Website
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Earthlixir',
  url: 'https://earthlixir.net',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://earthlixir.net/catalog?search={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

// Structured Data for Local Business
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://earthlixir.net/#localbusiness',
  name: 'Earthlixir',
  image: 'https://earthlixir.net/hero.jpg',
  description: 'Premium African herbal tea from Cameroon. 100% natural, organic blends.',
  url: 'https://earthlixir.net',
  telephone: '+49-176-14379086',
  email: 'contact@earthlixir.net',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '6.261 Rue d\'antenne Mbankolo',
    addressLocality: 'Yaounde',
    addressCountry: 'CM',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '3.8480',
    longitude: '11.5021',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
    ],
    opens: '09:00',
    closes: '18:00',
  },
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '150',
  },
};

