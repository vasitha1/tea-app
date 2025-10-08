import { IsString, IsNumber, Min, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShippingDto {
  @ApiProperty({ description: 'The name of the shipping option', example: 'Standard Shipping' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({ description: 'The description of the shipping option', example: 'Delivered within 5-7 business days.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The cost of the shipping option', example: 5.99 })
  @IsNumber()
  @Min(0)
  cost: number;
}

