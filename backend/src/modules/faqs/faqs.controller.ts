import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, BadRequestException } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';

@ApiTags('faqs')
@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard) // Only authenticated admins can create FAQs
  @ApiBearerAuth() // Requires authentication token
  @ApiOperation({ summary: 'Create a new FAQ item' })
  @ApiResponse({ status: 201, description: 'The FAQ item has been successfully created.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g., invalid data).', type: BadRequestException })
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqsService.create(createFaqDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all FAQ items' })
  @ApiResponse({ status: 200, description: 'Return all FAQ items.' })
  findAll() {
    return this.faqsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a FAQ item by ID' })
  @ApiResponse({ status: 200, description: 'Return a single FAQ item.' })
  @ApiResponse({ status: 404, description: 'FAQ item not found.', type: NotFoundException })
  findOne(@Param('id') id: string) {
    return this.faqsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard) // Only authenticated admins can update FAQs
  @ApiBearerAuth() // Requires authentication token
  @ApiOperation({ summary: 'Update a FAQ item by ID' })
  @ApiResponse({ status: 200, description: 'The FAQ item has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'FAQ item not found.', type: NotFoundException })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g., invalid data).', type: BadRequestException })
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqsService.update(id, updateFaqDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard) // Only authenticated admins can delete FAQs
  @ApiBearerAuth() // Requires authentication token
  @ApiOperation({ summary: 'Delete a FAQ item by ID' })
  @ApiResponse({ status: 200, description: 'The FAQ item has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'FAQ item not found.', type: NotFoundException })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.faqsService.remove(id);
  }
}
