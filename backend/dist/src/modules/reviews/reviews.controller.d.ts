import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(createReviewDto: CreateReviewDto): Promise<import("../../entities/review.entity").Review>;
    findAll(): Promise<import("../../entities/review.entity").Review[]>;
    findOne(id: string): Promise<import("../../entities/review.entity").Review>;
    findReviewsByProductId(productId: string, country?: string): Promise<import("../../entities/review.entity").Review[]>;
    findReviewsByCountry(country: string): Promise<import("../../entities/review.entity").Review[]>;
    getAverageRatingForProduct(productId: string): Promise<{
        averageRating: number;
    }>;
    update(id: string, updateReviewDto: UpdateReviewDto): Promise<import("../../entities/review.entity").Review>;
    remove(id: string): Promise<void>;
}
