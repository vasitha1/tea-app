import { Review } from './review.entity';
import { OrderItem } from './order-item.entity';
import { Wishlist } from './wishlist.entity';
export declare class Product {
    id: string;
    name: string;
    flavor?: string;
    shortDescription?: string;
    longDescription?: string;
    healthBenefits?: string[];
    brewingInstructions?: string[];
    healthDisclaimer?: string;
    price: number;
    stock: number;
    imageUrl?: string;
    orderItems: OrderItem[];
    reviews: Review[];
    wishlists: Wishlist[];
    createdAt: Date;
    updatedAt: Date;
}
