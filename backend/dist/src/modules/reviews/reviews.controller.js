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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const reviews_service_1 = require("./reviews.service");
const create_review_dto_1 = require("./dto/create-review.dto");
const update_review_dto_1 = require("./dto/update-review.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const admin_guard_1 = require("../../common/guards/admin.guard");
let ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    async create(createReviewDto) {
        return this.reviewsService.create(createReviewDto);
    }
    findAll() {
        return this.reviewsService.findAll();
    }
    findOne(id) {
        return this.reviewsService.findOne(id);
    }
    findReviewsByProductId(productId, country) {
        return this.reviewsService.findReviewsByProductId(productId, country);
    }
    findReviewsByCountry(country) {
        return this.reviewsService.findReviewsByCountry(country);
    }
    async getAverageRatingForProduct(productId) {
        return { averageRating: await this.reviewsService.getAverageRatingForProduct(productId) };
    }
    update(id, updateReviewDto) {
        return this.reviewsService.update(id, updateReviewDto);
    }
    remove(id) {
        return this.reviewsService.remove(id);
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new review' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The review has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request (e.g., already reviewed this product).', type: common_1.BadRequestException }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all reviews' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all reviews.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a review by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return a single review.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Review not found.', type: common_1.NotFoundException }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('product/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all reviews for a specific product' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all reviews for a product.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.', type: common_1.NotFoundException }),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Query)('country')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "findReviewsByProductId", null);
__decorate([
    (0, common_1.Get)('country/:country'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all reviews for a specific country' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all reviews for a country.' }),
    __param(0, (0, common_1.Param)('country')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "findReviewsByCountry", null);
__decorate([
    (0, common_1.Get)('product/:productId/average-rating'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the average rating for a specific product' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the average rating.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.', type: common_1.NotFoundException }),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getAverageRatingForProduct", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a review by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The review has been successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Review not found.', type: common_1.NotFoundException }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_review_dto_1.UpdateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a review by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The review has been successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Review not found.', type: common_1.NotFoundException }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "remove", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, swagger_1.ApiTags)('reviews'),
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map