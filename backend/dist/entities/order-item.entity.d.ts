import { Product } from './product.entity';
import { Order } from './order.entity';
export declare class OrderItem {
    id: string;
    quantity: number;
    price: number;
    product: Product;
    order: Order;
    createdAt: Date;
    updatedAt: Date;
}
