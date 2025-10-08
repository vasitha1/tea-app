import { IsString, IsNumber, IsNotEmpty, Min, Max, IsUUID, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ description: 'The rating for the product (1-5 stars)', example: 5 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ description: 'The comment for the product review', example: 'Excellent product, highly recommended!' })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({ description: 'The ID of the product being reviewed', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' })
  @IsUUID()
  productId: string;

  @ApiPropertyOptional({ description: 'The ID of the user submitting the review (optional for guest reviews)', example: 'fedcba98-7654-3210-fedc-ba9876543210' })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiProperty({ description: 'The country of the reviewer', example: 'Cameroon' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiPropertyOptional({ description: 'Guest reviewer name (required if not authenticated)', example: 'John Doe' })
  @IsString()
  @IsOptional()
  guestName?: string;

  @ApiPropertyOptional({ description: 'Guest reviewer email (required if not authenticated)', example: 'john@example.com' })
  @IsEmail()
  @IsOptional()
  guestEmail?: string;
}
