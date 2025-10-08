import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'The order has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g., invalid product IDs, insufficient stock).', type: BadRequestException })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all orders (admin only)' })
  @ApiResponse({ status: 200, description: 'Return all orders.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Return a single order.' })
  @ApiResponse({ status: 404, description: 'Order not found.', type: NotFoundException })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an order by ID (admin only)' })
  @ApiResponse({ status: 200, description: 'The order has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Order not found.', type: NotFoundException })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g., invalid data).', type: BadRequestException })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an order by ID (admin only)' })
  @ApiResponse({ status: 200, description: 'The order has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Order not found.', type: NotFoundException })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}

