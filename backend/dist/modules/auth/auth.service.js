"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../entities/user.entity");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(userRepository, configService) {
        this.userRepository = userRepository;
        this.configService = configService;
    }
    async register(registerUserDto) {
        const { email, password, firstName, lastName } = registerUserDto;
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
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
    async login(loginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const accessToken = this.generateJwtToken(user.id, user.email, user.isAdmin);
        return { accessToken };
    }
    async validateUser(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
    generateJwtToken(userId, email, isAdmin) {
        const payload = { userId, email, isAdmin };
        return jwt.sign(payload, this.configService.get('JWT_SECRET'), { expiresIn: '1h' });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map