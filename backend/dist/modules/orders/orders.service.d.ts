import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { OrderItem } from '../../entities/order-item.entity';
import { Product } from '../../entities/product.entity';
import { User } from '../../entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersService {
    private readonly orderRepository;
    private readonly orderItemRepository;
    private readonly productRepository;
    private readonly userRepository;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, productRepository: Repository<Product>, userRepository: Repository<User>);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    remove(id: string): Promise<void>;
}
