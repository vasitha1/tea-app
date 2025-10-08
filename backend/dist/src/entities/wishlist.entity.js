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
exports.Wishlist = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const product_entity_1 = require("./product.entity");
let Wishlist = class Wishlist {
};
exports.Wishlist = Wishlist;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Wishlist.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.wishlists),
    __metadata("design:type", user_entity_1.User)
], Wishlist.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.wishlists),
    __metadata("design:type", product_entity_1.Product)
], Wishlist.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Wishlist.prototype, "addedAt", void 0);
exports.Wishlist = Wishlist = __decorate([
    (0, typeorm_1.Entity)()
], Wishlist);
//# sourceMappingURL=wishlist.entity.js.map