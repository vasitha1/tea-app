import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
// import { Category } from '../../entities/category.entity'; // Removed Category entity import

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Removed Category from here
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [TypeOrmModule, ProductsService],
})
export class ProductsModule {}
