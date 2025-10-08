import { User } from './user.entity';
import { Product } from './product.entity';
export declare class Review {
    id: string;
    rating: number;
    comment: string;
    country: string;
    guestName: string;
    guestEmail: string;
    user: User;
    product: Product;
    createdAt: Date;
    updatedAt: Date;
}
