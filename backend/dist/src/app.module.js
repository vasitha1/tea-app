"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const product_entity_1 = require("./entities/product.entity");
const user_entity_1 = require("./entities/user.entity");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const review_entity_1 = require("./entities/review.entity");
const wishlist_entity_1 = require("./entities/wishlist.entity");
const faq_entity_1 = require("./modules/faqs/faq.entity");
const products_module_1 = require("./modules/products/products.module");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const orders_module_1 = require("./modules/orders/orders.module");
const reviews_module_1 = require("./modules/reviews/reviews.module");
const shipping_module_1 = require("./modules/shipping/shipping.module");
const email_module_1 = require("./modules/email/email.module");
const contact_module_1 = require("./modules/contact/contact.module");
const faqs_module_1 = require("./modules/faqs/faqs.module");
const raw_body_1 = require("raw-body");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply((req, res, next) => {
            if (req.originalUrl === '/payments/webhook' && req.method === 'POST') {
                (0, raw_body_1.default)(req, { length: req.headers['content-length'], limit: '1mb' }, (err, buffer) => {
                    if (err) {
                        return next(err);
                    }
                    req.rawBody = buffer;
                    next();
                });
            }
            else {
                next();
            }
        })
            .forRoutes('/payments/webhook');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: './.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const databaseUrl = configService.get('DATABASE_URL') || configService.get('POSTGRES_URL');
                    if (databaseUrl) {
                        return {
                            type: 'postgres',
                            url: databaseUrl,
                            entities: [product_entity_1.Product, user_entity_1.User, order_entity_1.Order, order_item_entity_1.OrderItem, review_entity_1.Review, wishlist_entity_1.Wishlist, faq_entity_1.Faq],
                            synchronize: true,
                            ssl: {
                                rejectUnauthorized: false,
                            },
                        };
                    }
                    else {
                        return {
                            type: 'postgres',
                            host: configService.get('DB_HOST', 'localhost'),
                            port: configService.get('DB_PORT', 5434),
                            username: configService.get('DB_USERNAME', 'postgres'),
                            password: configService.get('DB_PASSWORD', 'password'),
                            database: configService.get('DB_DATABASE', 'tea_shop'),
                            entities: [product_entity_1.Product, user_entity_1.User, order_entity_1.Order, order_item_entity_1.OrderItem, review_entity_1.Review, wishlist_entity_1.Wishlist, faq_entity_1.Faq],
                            synchronize: true,
                        };
                    }
                },
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            products_module_1.ProductsModule,
            users_module_1.UsersModule,
            orders_module_1.OrdersModule,
            reviews_module_1.ReviewsModule,
            shipping_module_1.ShippingModule,
            email_module_1.EmailModule,
            contact_module_1.ContactModule,
            faqs_module_1.FaqsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map