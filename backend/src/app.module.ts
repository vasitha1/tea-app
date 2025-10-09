import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './entities/product.entity';
// import { Category } from '@entities/category.entity'; // Removed Category entity
import { User } from './entities/user.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Review } from './entities/review.entity';
import { Wishlist } from './entities/wishlist.entity';
import { Faq } from './modules/faqs/faq.entity'; // Explicit relative import for Faq entity
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
// import { CategoriesModule } from './modules/categories/categories.module'; // Removed CategoriesModule
import { OrdersModule } from './modules/orders/orders.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { ShippingModule } from './modules/shipping/shipping.module';
import { EmailModule } from './modules/email/email.module';
import { ContactModule } from './modules/contact/contact.module';
import { FaqsModule } from './modules/faqs/faqs.module';
import rawbody from 'raw-body';
import { Request, Response } from 'express';
// import { AdminModule } from './modules/admin.module'; // Added based on list_dir
// import { InventoryModule } from './modules/inventory.module'; // Added based on list_dir

interface CustomRequest extends Request {
  rawBody: Buffer;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // Check for DATABASE_URL first (production), then fall back to individual vars (local)
        const databaseUrl = configService.get<string>('DATABASE_URL') || configService.get<string>('POSTGRES_URL') || configService.get<string>('POSTGRES_DATABASE_URL');
        
        if (databaseUrl) {
          // Production: Use connection string
          return {
            type: 'postgres' as const,
            url: databaseUrl,
            entities: [Product, User, Order, OrderItem, Review, Wishlist, Faq],
            synchronize: true,
            ssl: {
              rejectUnauthorized: false, // Required for most cloud databases
            },
          };
        } else {
          // Local development: Use individual variables
          return {
            type: 'postgres' as const,
            host: configService.get<string>('DB_HOST', 'localhost'),
            port: configService.get<number>('DB_PORT', 5434),
            username: configService.get<string>('DB_USERNAME', 'postgres'),
            password: configService.get<string>('DB_PASSWORD', 'password'),
            database: configService.get<string>('DB_DATABASE', 'tea_shop'),
            entities: [Product, User, Order, OrderItem, Review, Wishlist, Faq],
            synchronize: true,
          };
        }
      },
      inject: [ConfigService],
    }),
    AuthModule,
    ProductsModule,
    UsersModule,
    // CategoriesModule, // Removed CategoriesModule
    OrdersModule,
    ReviewsModule,
    ShippingModule,
    EmailModule,
    ContactModule,
    FaqsModule,
    // AdminModule, // Added
    // InventoryModule, // Added
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req: CustomRequest, res: Response, next: Function) => {
        if (req.originalUrl === '/payments/webhook' && req.method === 'POST') {
          rawbody(req, { length: req.headers['content-length'], limit: '1mb' }, (err, buffer) => {
            if (err) {
              return next(err);
            }
            req.rawBody = buffer;
            next();
          });
        } else {
          next();
        }
      })
      .forRoutes('/payments/webhook');
  }
}
