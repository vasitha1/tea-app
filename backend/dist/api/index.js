"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = require("express");
const path_1 = require("path");
const expressApp = (0, express_1.default)();
let cachedApp;
async function createNestApp() {
    if (cachedApp) {
        return cachedApp;
    }
    const adapter = new platform_express_1.ExpressAdapter(expressApp);
    const app = await core_1.NestFactory.create(app_module_1.AppModule, adapter);
    app.enableCors();
    app.setGlobalPrefix('api');
    app.use('/images', express_1.default.static((0, path_1.join)(__dirname, '..', 'public', 'images')));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    await app.init();
    cachedApp = app;
    return app;
}
exports.default = async (req, res) => {
    await createNestApp();
    return expressApp(req, res);
};
//# sourceMappingURL=index.js.map