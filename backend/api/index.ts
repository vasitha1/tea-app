import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { join } from 'path';

const expressApp = express();
let cachedApp: any;

async function createNestApp() {
  if (cachedApp) {
    return cachedApp;
  }

  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);

  app.enableCors();
  app.setGlobalPrefix('api');

  app.use('/images', express.static(join(__dirname, '..', 'public', 'images')));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.init();
  cachedApp = app;
  
  return app;
}

export default async (req: any, res: any) => {
  await createNestApp();
  return expressApp(req, res);
};

