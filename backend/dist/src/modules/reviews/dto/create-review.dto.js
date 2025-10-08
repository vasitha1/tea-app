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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReviewDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateReviewDto {
}
exports.CreateReviewDto = CreateReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The rating for the product (1-5 stars)', example: 5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The comment for the product review', example: 'Excellent product, highly recommended!' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the product being reviewed', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'The ID of the user submitting the review (optional for guest reviews)', example: 'fedcba98-7654-3210-fedc-ba9876543210' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The country of the reviewer', example: 'Cameroon' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Guest reviewer name (required if not authenticated)', example: 'John Doe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "guestName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Guest reviewer email (required if not authenticated)', example: 'john@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "guestEmail", void 0);
//# sourceMappingURL=create-review.dto.js.map