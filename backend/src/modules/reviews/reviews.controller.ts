import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, NotFoundException, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: 201, description: 'The review has been successfully created.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g., already reviewed this product).', type: BadRequestException })
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({ status: 200, description: 'Return all reviews.' })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a review by ID' })
  @ApiResponse({ status: 200, description: 'Return a single review.' })
  @ApiResponse({ status: 404, description: 'Review not found.', type: NotFoundException })
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get all reviews for a specific product' })
  @ApiResponse({ status: 200, description: 'Return all reviews for a product.' })
  @ApiResponse({ status: 404, description: 'Product not found.', type: NotFoundException })
  findReviewsByProductId(
    @Param('productId') productId: string,
    @Query('country') country?: string,
  ) {
    return this.reviewsService.findReviewsByProductId(productId, country);
  }

  @Get('country/:country')
  @ApiOperation({ summary: 'Get all reviews for a specific country' })
  @ApiResponse({ status: 200, description: 'Return all reviews for a country.' })
  findReviewsByCountry(@Param('country') country: string) {
    return this.reviewsService.findReviewsByCountry(country);
  }

  @Get('product/:productId/average-rating')
  @ApiOperation({ summary: 'Get the average rating for a specific product' })
  @ApiResponse({ status: 200, description: 'Return the average rating.' })
  @ApiResponse({ status: 404, description: 'Product not found.', type: NotFoundException })
  async getAverageRatingForProduct(@Param('productId') productId: string) {
    return { averageRating: await this.reviewsService.getAverageRatingForProduct(productId) };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard) // Protect this route with authentication and admin role
  @ApiBearerAuth() // Requires authentication token
  @ApiOperation({ summary: 'Update a review by ID' })
  @ApiResponse({ status: 200, description: 'The review has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Review not found.', type: NotFoundException })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard) // Protect this route with authentication and admin role
  @ApiBearerAuth() // Requires authentication token
  @ApiOperation({ summary: 'Delete a review by ID' })
  @ApiResponse({ status: 200, description: 'The review has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Review not found.', type: NotFoundException })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
