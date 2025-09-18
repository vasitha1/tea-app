import ProductCard from '@/components/ProductCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tea Catalog',
  description: 'Browse our wide selection of exquisite teas, including green tea, black tea, herbal infusions, and more.',
  keywords: ['tea catalog', 'buy tea', 'tea shop online', 'green tea', 'black tea', 'herbal tea'],
  openGraph: {
    title: 'Tea Catalog - Tea-App E-commerce',
    description: 'Browse our wide selection of exquisite teas, including green tea, black tea, herbal infusions, and more.',
    url: 'https://www.teaapp.com/catalog', // Replace with your actual domain
    images: [
      {
        url: 'https://www.teaapp.com/catalog-og-image.jpg', // Replace with your actual Open Graph image for catalog
        width: 1200,
        height: 630,
        alt: 'Tea Catalog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tea Catalog - Tea-App E-commerce',
    description: 'Browse our wide selection of exquisite teas, including green tea, black tea, herbal infusions, and more.',
    images: ['https://www.teaapp.com/catalog-twitter-image.jpg'], // Replace with your actual Twitter image for catalog
  },
};

const products = [
  {
    id: 1,
    name: 'Green Tea Classic',
    description: 'A refreshing classic green tea, perfect for any time of day.',
    price: 12.99,
    image_url: '/images/green-tea-classic.jpg',
    weight: 0.2, // kg
  },
  {
    id: 2,
    name: 'Black Tea English Breakfast',
    description: 'A strong and robust black tea, ideal for starting your morning.',
    price: 14.50,
    image_url: '/images/black-tea-english-breakfast.jpg',
    weight: 0.3, // kg
  },
  {
    id: 3,
    name: 'Herbal Infusion Chamomile',
    description: 'A soothing chamomile herbal infusion, perfect for relaxation.',
    price: 10.00,
    image_url: '/images/herbal-infusion-chamomile.jpg',
    weight: 0.15, // kg
  },
  {
    id: 4,
    name: 'Oolong Tea Supreme',
    description: 'A rich and complex oolong tea with a delicate floral aroma.',
    price: 18.75,
    image_url: '/images/oolong-tea-supreme.jpg',
    weight: 0.25, // kg
  },
  {
    id: 5,
    name: 'White Tea Silver Needle',
    description: 'A rare and delicate white tea, known for its subtle sweetness.',
    price: 25.00,
    image_url: '/images/white-tea-silver-needle.jpg',
    weight: 0.1, // kg
  },
  {
    id: 6,
    name: 'Pu-erh Tea Aged',
    description: 'A deeply earthy and complex aged Pu-erh tea, prized for its unique flavor.',
    price: 30.00,
    image_url: '/images/pu-erh-tea-aged.jpg',
    weight: 0.4, // kg
  },
];

const CatalogPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Our Tea Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
