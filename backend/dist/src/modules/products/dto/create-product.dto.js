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
exports.CreateProductDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateProductDto {
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The name of the product', example: 'Green Tea Supreme' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The flavor of the product', example: 'Spicy Ginger' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "flavor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'A short description of the product', example: 'A refreshing and antioxidant-rich green tea.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "shortDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'A detailed description of the product', example: 'This organic green tea is sourced from the finest leaves...' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "longDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'List of health benefits', type: [String], example: ['Boosts immunity', 'Aids digestion'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "healthBenefits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Instructions for brewing', type: [String], example: ['Use one tea bag', 'Steep for 3-5 minutes'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "brewingInstructions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Health disclaimer', example: 'Consult a doctor before use.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "healthDisclaimer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The price of the product', example: 12.99, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The stock quantity of the product', example: 100, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The path to the product image', example: '/images/green-tea.jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "imageUrl", void 0);
//# sourceMappingURL=create-product.dto.js.map