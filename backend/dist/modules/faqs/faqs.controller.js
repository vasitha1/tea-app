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
exports.FaqsController = void 0;
const common_1 = require("@nestjs/common");
const faqs_service_1 = require("./faqs.service");
const create_faq_dto_1 = require("./dto/create-faq.dto");
const update_faq_dto_1 = require("./dto/update-faq.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const admin_guard_1 = require("../../common/guards/admin.guard");
let FaqsController = class FaqsController {
    constructor(faqsService) {
        this.faqsService = faqsService;
    }
    create(createFaqDto) {
        return this.faqsService.create(createFaqDto);
    }
    findAll() {
        return this.faqsService.findAll();
    }
    findOne(id) {
        return this.faqsService.findOne(id);
    }
    update(id, updateFaqDto) {
        return this.faqsService.update(id, updateFaqDto);
    }
    remove(id) {
        return this.faqsService.remove(id);
    }
};
exports.FaqsController = FaqsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new FAQ item' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The FAQ item has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request (e.g., invalid data).', type: common_1.BadRequestException }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_faq_dto_1.CreateFaqDto]),
    __metadata("design:returntype", void 0)
], FaqsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all FAQ items' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all FAQ items.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FaqsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a FAQ item by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return a single FAQ item.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'FAQ item not found.', type: common_1.NotFoundException }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FaqsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a FAQ item by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The FAQ item has been successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'FAQ item not found.', type: common_1.NotFoundException }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request (e.g., invalid data).', type: common_1.BadRequestException }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_faq_dto_1.UpdateFaqDto]),
    __metadata("design:returntype", void 0)
], FaqsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a FAQ item by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The FAQ item has been successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'FAQ item not found.', type: common_1.NotFoundException }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FaqsController.prototype, "remove", null);
exports.FaqsController = FaqsController = __decorate([
    (0, swagger_1.ApiTags)('faqs'),
    (0, common_1.Controller)('faqs'),
    __metadata("design:paramtypes", [faqs_service_1.FaqsService])
], FaqsController);
//# sourceMappingURL=faqs.controller.js.map