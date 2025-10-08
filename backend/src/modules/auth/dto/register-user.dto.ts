import { IsString, IsEmail, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ description: 'The email of the user', example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The password of the user (min 6 characters)', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @ApiProperty({ description: 'The first name of the user', example: 'John' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  firstName: string;

  @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  lastName: string;
}
