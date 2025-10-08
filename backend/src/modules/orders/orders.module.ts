import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../entities/order.entity';
import { OrderItem } from '../../entities/order-item.entity';
import { Product } from '../../entities/product.entity';
import { User } from '../../entities/user.entity'; // Import User entity
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Product, User]), // Add User to forFeature
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [TypeOrmModule, OrdersService],
})
export class OrdersModule {}
