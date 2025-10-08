"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const review_entity_1 = require("../../entities/review.entity");
const product_entity_1 = require("../../entities/product.entity");
const user_entity_1 = require("../../entities/user.entity");
const email_service_1 = require("../email/email.service");
let ReviewsService = class ReviewsService {
    constructor(reviewRepository, productRepository, userRepository, emailService) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    async create(createReviewDto) {
        const { productId, userId, country, guestName, guestEmail, ...reviewData } = createReviewDto;
        const product = await this.productRepository.findOne({ where: { id: productId } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        let user = null;
        if (userId) {
            user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${userId} not found`);
            }
            const existingReview = await this.reviewRepository.findOne({ where: { product: { id: productId }, user: { id: userId } } });
            if (existingReview) {
                throw new common_1.BadRequestException('You have already reviewed this product.');
            }
        }
        else {
            if (!guestName || !guestEmail) {
                throw new common_1.BadRequestException('Guest name and email are required for guest reviews.');
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
        const adminEmail = 'admin@earthlixir.com';
        await this.emailService.sendReviewNotification(adminEmail, product.name, review.comment, review.rating);
        return savedReview;
    }
    async findAll() {
        return this.reviewRepository.find({ relations: ['user', 'product'] });
    }
    async findOne(id) {
        const review = await this.reviewRepository.findOne({
            where: { id },
            relations: ['user', 'product'],
        });
        if (!review) {
            throw new common_1.NotFoundException(`Review with ID ${id} not found`);
        }
        return review;
    }
    async findReviewsByProductId(productId, country) {
        const product = await this.productRepository.findOne({ where: { id: productId } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        const whereCondition = { product: { id: productId } };
        if (country) {
            whereCondition.country = country;
        }
        return this.reviewRepository.find({ where: whereCondition, relations: ['user'] });
    }
    async findReviewsByCountry(country) {
        return this.reviewRepository.find({ where: { country }, relations: ['user', 'product'] });
    }
    async update(id, updateReviewDto) {
        const review = await this.findOne(id);
        Object.assign(review, updateReviewDto);
        return this.reviewRepository.save(review);
    }
    async remove(id) {
        const review = await this.findOne(id);
        await this.reviewRepository.remove(review);
    }
    async getAverageRatingForProduct(productId) {
        const result = await this.reviewRepository
            .createQueryBuilder('review')
            .select('AVG(review.rating)', 'average')
            .where('review.productId = :productId', { productId })
            .getRawOne();
        return parseFloat(result.average) || 0;
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map