import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../../entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Product } from '../../entities/product.entity';
import { User } from '../../entities/user.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService, // Inject EmailService
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const { productId, userId, country, guestName, guestEmail, ...reviewData } = createReviewDto;

    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    let user = null;
    if (userId) {
      user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const existingReview = await this.reviewRepository.findOne({ where: { product: { id: productId }, user: { id: userId } } });
      if (existingReview) {
        throw new BadRequestException('You have already reviewed this product.');
      }
    } else {
      // Guest review - validate guest info
      if (!guestName || !guestEmail) {
        throw new BadRequestException('Guest name and email are required for guest reviews.');
      }
    }

    const review = this.reviewRepository.create({ 
      ...reviewData, 
      product, 
      user, 
      country,
      guestName,
      guestEmail
    });
    const savedReview = await this.reviewRepository.save(review);

    // Send email notification to administrators
    // In a real application, you would fetch admin emails from a configuration or database
    const adminEmail = 'admin@earthlixir.com'; // Placeholder admin email
    await this.emailService.sendReviewNotification(adminEmail, product.name, review.comment, review.rating);

    return savedReview;
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find({ relations: ['user', 'product'] });
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async findReviewsByProductId(productId: string, country?: string): Promise<Review[]> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    const whereCondition: any = { product: { id: productId } };
    if (country) {
      whereCondition.country = country;
    }
    return this.reviewRepository.find({ where: whereCondition, relations: ['user'] });
  }

  async findReviewsByCountry(country: string): Promise<Review[]> {
    return this.reviewRepository.find({ where: { country }, relations: ['user', 'product'] });
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);
    Object.assign(review, updateReviewDto);
    return this.reviewRepository.save(review);
  }

  async remove(id: string): Promise<void> {
    const review = await this.findOne(id);
    await this.reviewRepository.remove(review);
  }

  async getAverageRatingForProduct(productId: string): Promise<number> {
    const result = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'average')
      .where('review.productId = :productId', { productId })
      .getRawOne();

    return parseFloat(result.average) || 0;
  }
}
