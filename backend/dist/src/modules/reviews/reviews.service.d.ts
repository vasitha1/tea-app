import { Repository } from 'typeorm';
import { Review } from '../../entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Product } from '../../entities/product.entity';
import { User } from '../../entities/user.entity';
import { EmailService } from '../email/email.service';
export declare class ReviewsService {
    private readonly reviewRepository;
    private readonly productRepository;
    private readonly userRepository;
    private readonly emailService;
    constructor(reviewRepository: Repository<Review>, productRepository: Repository<Product>, userRepository: Repository<User>, emailService: EmailService);
    create(createReviewDto: CreateReviewDto): Promise<Review>;
    findAll(): Promise<Review[]>;
    findOne(id: string): Promise<Review>;
    findReviewsByProductId(productId: string, country?: string): Promise<Review[]>;
    findReviewsByCountry(country: string): Promise<Review[]>;
    update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review>;
    remove(id: string): Promise<void>;
    getAverageRatingForProduct(productId: string): Promise<number>;
}
