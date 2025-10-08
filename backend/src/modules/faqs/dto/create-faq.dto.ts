import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqDto {
  @ApiProperty({ description: 'The question for the FAQ', example: 'What are your shipping policies?' })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({ description: 'The answer to the FAQ', example: 'We offer worldwide shipping with various options.' })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty({ description: 'The display order of the FAQ (lower number means higher priority)', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  order?: number;
}
