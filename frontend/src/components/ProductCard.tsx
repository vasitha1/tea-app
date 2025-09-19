import Image from 'next/image';



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
  return null;
};

export default ProductCard;
