import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<{ accessToken: string }> {
    const { email, password, firstName, lastName } = registerUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      isAdmin: false,
    });

    await this.userRepository.save(user);

    const accessToken = this.generateJwtToken(user.id, user.email, user.isAdmin);
    return { accessToken };
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateJwtToken(user.id, user.email, user.isAdmin);
    return { accessToken };
  }

  async validateUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private generateJwtToken(userId: string, email: string, isAdmin: boolean): string {
    const payload = { userId, email, isAdmin };
    return jwt.sign(payload, this.configService.get<string>('JWT_SECRET'), { expiresIn: '1h' });
  }
}
