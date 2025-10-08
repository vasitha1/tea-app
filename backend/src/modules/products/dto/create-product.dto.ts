import { IsString, IsNumber, IsOptional, Min, MaxLength, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product', example: 'Green Tea Supreme' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ description: 'The flavor of the product', example: 'Spicy Ginger' })
  @IsOptional()
  @IsString()
  flavor?: string;

  @ApiProperty({ description: 'A short description of the product', example: 'A refreshing and antioxidant-rich green tea.' })
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiProperty({ description: 'A detailed description of the product', example: 'This organic green tea is sourced from the finest leaves...' })
  @IsOptional()
  @IsString()
  longDescription?: string;

  @ApiProperty({ description: 'List of health benefits', type: [String], example: ['Boosts immunity', 'Aids digestion'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  healthBenefits?: string[];

  @ApiProperty({ description: 'Instructions for brewing', type: [String], example: ['Use one tea bag', 'Steep for 3-5 minutes'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  brewingInstructions?: string[];

  @ApiProperty({ description: 'Health disclaimer', example: 'Consult a doctor before use.' })
  @IsOptional()
  @IsString()
  healthDisclaimer?: string;

  @ApiProperty({ description: 'The price of the product', example: 12.99, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({ description: 'The stock quantity of the product', example: 100, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @ApiProperty({ description: 'The path to the product image', example: '/images/green-tea.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
