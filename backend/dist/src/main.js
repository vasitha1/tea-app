"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:3001',
            'http://localhost:3000',
            'https://earthlixir.net',
            'https://www.earthlixir.net',
            /https:\/\/.*\.vercel\.app$/,
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
        credentials: true,
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'Origin',
            'X-Requested-With',
        ],
        exposedHeaders: ['Content-Range', 'X-Content-Range'],
        maxAge: 86400,
    });
    app.setGlobalPrefix('api');
    app.use('/images', express.static((0, path_1.join)(__dirname, '..', 'public', 'images')));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Earthlixir API')
        .setDescription('The Earthlixir API description')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(3001);
    const appUrl = await app.getUrl();
    console.log(`Application is running on: ${appUrl}`);
    console.log(`API Documentation is running on: ${appUrl}/api-docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map