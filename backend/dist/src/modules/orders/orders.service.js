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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../../entities/order.entity");
const order_item_entity_1 = require("../../entities/order-item.entity");
const product_entity_1 = require("../../entities/product.entity");
const user_entity_1 = require("../../entities/user.entity");
let OrdersService = class OrdersService {
    constructor(orderRepository, orderItemRepository, productRepository, userRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }
    async create(createOrderDto) {
        const { userId, items } = createOrderDto;
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const order = this.orderRepository.create({ user });
        await this.orderRepository.save(order);
        let totalAmount = 0;
        for (const itemDto of items) {
            const product = await this.productRepository.findOne({ where: { id: itemDto.productId } });
            if (!product) {
                throw new common_1.NotFoundException(`Product with ID ${itemDto.productId} not found`);
            }
            if (product.stock < itemDto.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for product ${product.name}`);
            }
            const orderItem = this.orderItemRepository.create({
                order,
                product,
                quantity: itemDto.quantity,
                price: product.price,
            });
            await this.orderItemRepository.save(orderItem);
            product.stock -= itemDto.quantity;
            await this.productRepository.save(product);
            totalAmount += product.price * itemDto.quantity;
        }
        order.totalAmount = totalAmount;
        return this.orderRepository.save(order);
    }
    async findAll() {
        return this.orderRepository.find({
            relations: ['user', 'orderItems', 'orderItems.product'],
        });
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['user', 'orderItems', 'orderItems.product'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async update(id, updateOrderDto) {
        const order = await this.findOne(id);
        Object.assign(order, updateOrderDto);
        return this.orderRepository.save(order);
    }
    async remove(id) {
        const order = await this.findOne(id);
        await this.orderRepository.remove(order);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map