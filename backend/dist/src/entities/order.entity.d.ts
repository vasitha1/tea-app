import { User } from './user.entity';
import { OrderItem } from './order-item.entity';
export declare class Order {
    id: string;
    status: string;
    totalAmount: number;
    shippingAddress: string;
    billingAddress: string;
    user: User;
    orderItems: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}
