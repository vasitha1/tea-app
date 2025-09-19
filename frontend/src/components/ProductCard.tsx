import Image from 'next/image';
import Link from 'next/link';
import { FaHeart as FaHeartOutline } from 'react-icons/fa'; // Outline for not in wishlist
import { FaHeart as FaHeartSolid } from 'react-icons/fa';   // Solid for in wishlist


interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {


  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`${product.name} added to cart!`);
  };


  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden relative group">
      <Link href={`/product/${product.id}`} className="block">
        <Image
          src={product.image_url || '/placeholder.jpg'}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
