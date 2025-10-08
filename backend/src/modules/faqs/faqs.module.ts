import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faq } from './faq.entity';
import { FaqsService } from './faqs.service';
import { FaqsController } from './faqs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Faq])],
  providers: [FaqsService],
  controllers: [FaqsController],
  exports: [FaqsService, TypeOrmModule], // Export FaqsService if it's used in other modules
})
export class FaqsModule {}
