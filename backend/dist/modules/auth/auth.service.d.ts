import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userRepository;
    private configService;
    constructor(userRepository: Repository<User>, configService: ConfigService);
    register(registerUserDto: RegisterUserDto): Promise<{
        accessToken: string;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        accessToken: string;
    }>;
    validateUser(userId: string): Promise<User>;
    private generateJwtToken;
}
