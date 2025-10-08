import { IsString, IsArray, ArrayMinSize, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty({ description: 'The ID of the product', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' })
  @IsString()
  productId: string;

  @ApiProperty({ description: 'The quantity of the product', example: 2 })
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'The ID of the user placing the order', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' })
  @IsString()
  userId: string;

  @ApiProperty({ type: [OrderItemDto], description: 'List of products and their quantities in the order' })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

