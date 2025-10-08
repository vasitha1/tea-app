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
exports.ShippingController = void 0;
const common_1 = require("@nestjs/common");
const shipping_service_1 = require("./shipping.service");
const create_shipping_dto_1 = require("./dto/create-shipping.dto");
const update_shipping_dto_1 = require("./dto/update-shipping.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const admin_guard_1 = require("../../common/guards/admin.guard");
let ShippingController = class ShippingController {
    constructor(shippingService) {
        this.shippingService = shippingService;
    }
    create(createShippingDto) {
        return this.shippingService.create(createShippingDto);
    }
    findAll() {
        return this.shippingService.findAll();
    }
    findOne(id) {
        return this.shippingService.findOne(id);
    }
    update(id, updateShippingDto) {
        return this.shippingService.update(id, updateShippingDto);
    }
    remove(id) {
        return this.shippingService.remove(id);
    }
};
exports.ShippingController = ShippingController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new shipping option' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The shipping option has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request (e.g., invalid data).', type: common_1.BadRequestException }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shipping_dto_1.CreateShippingDto]),
    __metadata("design:returntype", void 0)
], ShippingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all shipping options' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all shipping options.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShippingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a shipping option by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return a single shipping option.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Shipping option not found.', type: common_1.NotFoundException }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShippingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a shipping option by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The shipping option has been successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Shipping option not found.', type: common_1.NotFoundException }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request (e.g., invalid data).', type: common_1.BadRequestException }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shipping_dto_1.UpdateShippingDto]),
    __metadata("design:returntype", void 0)
], ShippingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a shipping option by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The shipping option has been successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Shipping option not found.', type: common_1.NotFoundException }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShippingController.prototype, "remove", null);
exports.ShippingController = ShippingController = __decorate([
    (0, swagger_1.ApiTags)('shipping'),
    (0, common_1.Controller)('shipping'),
    __metadata("design:paramtypes", [shipping_service_1.ShippingService])
], ShippingController);
//# sourceMappingURL=shipping.controller.js.map