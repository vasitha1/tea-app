import { Review } from './review.entity';
import { Order } from './order.entity';
import { Wishlist } from './wishlist.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    reviews: Review[];
    orders: Order[];
    wishlists: Wishlist[];
    createdAt: Date;
    updatedAt: Date;
}
