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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const admin_guard_1 = require("../../common/guards/admin.guard");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async create(createProductDto) {
        return this.productsService.create(createProductDto);
    }
    findAll(search) {
        return this.productsService.findAll(search);
    }
    findOne(id) {
        return this.productsService.findOne(id);
    }
    update(id, updateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }
    remove(id) {
        return this.productsService.remove(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                flavor: { type: 'string' },
                shortDescription: { type: 'string' },
                longDescription: { type: 'string' },
                healthBenefits: { type: 'array', items: { type: 'string' } },
                brewingInstructions: { type: 'array', items: { type: 'string' } },
                healthDisclaimer: { type: 'string' },
                price: { type: 'number' },
                stock: { type: 'number' },
                imageUrl: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new product', description: 'Creates a new product (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The product has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request (e.g., invalid category ID).', type: common_1.BadRequestException }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all products.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request (e.g., invalid search parameters).', type: common_1.BadRequestException }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String, description: 'Search term for product name or description' }),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a product by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return a single product.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.', type: common_1.NotFoundException }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                flavor: { type: 'string' },
                shortDescription: { type: 'string' },
                longDescription: { type: 'string' },
                healthBenefits: { type: 'array', items: { type: 'string' } },
                brewingInstructions: { type: 'array', items: { type: 'string' } },
                healthDisclaimer: { type: 'string' },
                price: { type: 'number' },
                stock: { type: 'number' },
                imageUrl: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Update a product by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The product has been successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request (e.g., invalid product data).', type: common_1.BadRequestException }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.', type: common_1.NotFoundException }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a product by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The product has been successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.', type: common_1.NotFoundException }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map