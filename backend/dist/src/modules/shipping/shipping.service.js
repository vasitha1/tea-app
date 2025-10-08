"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingService = void 0;
const common_1 = require("@nestjs/common");
let ShippingService = class ShippingService {
    constructor() {
        this.shippingOptions = [];
        this.nextId = 1;
    }
    async create(createShippingDto) {
        const newOption = { id: (this.nextId++).toString(), ...createShippingDto };
        this.shippingOptions.push(newOption);
        return newOption;
    }
    async findAll() {
        return this.shippingOptions;
    }
    async findOne(id) {
        const option = this.shippingOptions.find(opt => opt.id === id);
        if (!option) {
            throw new common_1.NotFoundException(`Shipping option with ID ${id} not found`);
        }
        return option;
    }
    async update(id, updateShippingDto) {
        const option = await this.findOne(id);
        Object.assign(option, updateShippingDto);
        return option;
    }
    async remove(id) {
        const index = this.shippingOptions.findIndex(opt => opt.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Shipping option with ID ${id} not found`);
        }
        this.shippingOptions.splice(index, 1);
    }
};
exports.ShippingService = ShippingService;
exports.ShippingService = ShippingService = __decorate([
    (0, common_1.Injectable)()
], ShippingService);
//# sourceMappingURL=shipping.service.js.map