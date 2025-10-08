import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactSubmissionDto {
  @ApiProperty({ description: 'Reason for contact', example: 'General Inquiry' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  reason: string;

  @ApiProperty({ description: 'Optional phone number', example: '+1234567890', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  phoneNumber?: string;

  @ApiProperty({ description: `Sender's email address`, example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @ApiProperty({ description: 'Message content', example: 'I have a question about your products.' })
  @IsString()
  @IsNotEmpty()
  message: string;
}
