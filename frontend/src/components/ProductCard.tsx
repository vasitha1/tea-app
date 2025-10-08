import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/page';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden relative group">
      <Link href={`/products/${product.id}`} className="block">
        <Image
          src={product.imageUrl?.startsWith('http') ? product.imageUrl : product.imageUrl?.replace('/images/', '/') || '/placeholder.jpg'}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          {product.shortDescription && (
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.shortDescription}</p>
          )}
        </div>
      </Link>
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Add to Cart
        </button>
        <Link
          href={`/products/${product.id}`}
          className="block w-full text-center mt-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
