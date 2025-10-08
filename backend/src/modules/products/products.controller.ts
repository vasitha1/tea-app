import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard) // Re-enabled admin guards
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        flavor: { type: 'string' },
        shortDescription: { type: 'string' },
        longDescription: { type: 'string' },
        healthBenefits: { type: 'array', items: { type: 'string' } },
        brewingInstructions: { type: 'array', items: { type: 'string' } },
        healthDisclaimer: { type: 'string' },
        price: { type: 'number' },
        stock: { type: 'number' },
        imageUrl: { type: 'string' },
      },
    },
  })
  @ApiOperation({ summary: 'Create a new product', description: 'Creates a new product (Admin only)' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g., invalid category ID).', type: BadRequestException })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g., invalid search parameters).', type: BadRequestException })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search term for product name or description' })
  findAll(
    @Query('search') search?: string,
  ) {
    return this.productsService.findAll(search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Return a single product.' })
  @ApiResponse({ status: 404, description: 'Product not found.', type: NotFoundException })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        flavor: { type: 'string' },
        shortDescription: { type: 'string' },
        longDescription: { type: 'string' },
        healthBenefits: { type: 'array', items: { type: 'string' } },
        brewingInstructions: { type: 'array', items: { type: 'string' } },
        healthDisclaimer: { type: 'string' },
        price: { type: 'number' },
        stock: { type: 'number' },
        imageUrl: { type: 'string' },
      },
    },
  })
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({ status: 200, description: 'The product has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g., invalid product data).', type: BadRequestException })
  @ApiResponse({ status: 404, description: 'Product not found.', type: NotFoundException })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Product not found.', type: NotFoundException })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
