import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, BadRequestException } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';

@ApiTags('shipping')
@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new shipping option' })
  @ApiResponse({ status: 201, description: 'The shipping option has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g., invalid data).', type: BadRequestException })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createShippingDto: CreateShippingDto) {
    return this.shippingService.create(createShippingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all shipping options' })
  @ApiResponse({ status: 200, description: 'Return all shipping options.' })
  findAll() {
    return this.shippingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a shipping option by ID' })
  @ApiResponse({ status: 200, description: 'Return a single shipping option.' })
  @ApiResponse({ status: 404, description: 'Shipping option not found.', type: NotFoundException })
  findOne(@Param('id') id: string) {
    return this.shippingService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a shipping option by ID' })
  @ApiResponse({ status: 200, description: 'The shipping option has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Shipping option not found.', type: NotFoundException })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g., invalid data).', type: BadRequestException })
  update(@Param('id') id: string, @Body() updateShippingDto: UpdateShippingDto) {
    return this.shippingService.update(id, updateShippingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a shipping option by ID' })
  @ApiResponse({ status: 200, description: 'The shipping option has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Shipping option not found.', type: NotFoundException })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.shippingService.remove(id);
  }
}

