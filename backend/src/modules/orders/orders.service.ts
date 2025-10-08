import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { OrderItem } from '../../entities/order-item.entity';
import { Product } from '../../entities/product.entity';
import { User } from '../../entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, items } = createOrderDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const order = this.orderRepository.create({ user });
    await this.orderRepository.save(order);

    let totalAmount = 0;
    for (const itemDto of items) {
      const product = await this.productRepository.findOne({ where: { id: itemDto.productId } });
      if (!product) {
        throw new NotFoundException(`Product with ID ${itemDto.productId} not found`);
      }
      if (product.stock < itemDto.quantity) {
        throw new BadRequestException(`Insufficient stock for product ${product.name}`);
      }

      const orderItem = this.orderItemRepository.create({
        order,
        product,
        quantity: itemDto.quantity,
        price: product.price, // Store price at the time of order
      });
      await this.orderItemRepository.save(orderItem);

      product.stock -= itemDto.quantity;
      await this.productRepository.save(product);

      totalAmount += product.price * itemDto.quantity;
    }

    order.totalAmount = totalAmount;
    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user', 'items', 'items.product'],
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    // For simplicity, updating an order currently only allows changing status or adding notes.
    // More complex updates (e.g., changing items) would require more sophisticated logic.
    Object.assign(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}

