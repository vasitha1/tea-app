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

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'https://earthlixir.net',
      'https://www.earthlixir.net',
      // Add your Vercel preview URLs if needed
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
    maxAge: 86400, // 24 hours
  });
  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });

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

