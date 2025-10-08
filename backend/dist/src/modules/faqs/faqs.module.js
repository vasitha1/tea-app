"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const faq_entity_1 = require("./faq.entity");
const faqs_service_1 = require("./faqs.service");
const faqs_controller_1 = require("./faqs.controller");
let FaqsModule = class FaqsModule {
};
exports.FaqsModule = FaqsModule;
exports.FaqsModule = FaqsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([faq_entity_1.Faq])],
        providers: [faqs_service_1.FaqsService],
        controllers: [faqs_controller_1.FaqsController],
        exports: [faqs_service_1.FaqsService, typeorm_1.TypeOrmModule],
    })
], FaqsModule);
//# sourceMappingURL=faqs.module.js.map