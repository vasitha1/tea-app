import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../../entities/review.entity';
import { Product } from '../../entities/product.entity';
import { User } from '../../entities/user.entity';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { EmailModule } from '../email/email.module'; // Import EmailModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Product, User]),
    EmailModule, // Import EmailModule here
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports: [TypeOrmModule, ReviewsService],
})
export class ReviewsModule {}
