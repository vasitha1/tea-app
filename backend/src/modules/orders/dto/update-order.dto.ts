import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({ description: 'The status of the order', example: 'shipped', required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ description: 'Any notes for the order', example: 'Customer requested gift wrapping', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

