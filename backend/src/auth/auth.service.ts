import {
    Logger,
    Injectable,
    UnauthorizedException,
    BadRequestException,
    InternalServerErrorException
} from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { plainToInstance } from "class-transformer";
import * as bcrypt from 'bcrypt';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDto} from "./dto/login.dto";
import { UserDto } from "../users/dto/user.dto";
import { User } from "../users/entity/user.entity";
import { VerificationCode } from "./entity/verification-code.entity";
import { VerificationCodeDto } from "./dto/verification-code.dto";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
        @InjectRepository(VerificationCode) private readonly verificationRepository: Repository<VerificationCode>
    ) {}

    private readonly logger = new Logger(AuthService.name, { timestamp: true });

    async register(createUserDto: CreateUserDto): Promise<UserDto> {
        this.logger.log('Creating new user', createUserDto);

        const createdUser = await this.usersService.create(createUserDto);
        const user = await this.usersService.findByEmail(createUserDto.email);
        if (!user) {
            throw new InternalServerErrorException("User not found after creation");
        }
        await this.sendVerificationEmail(user);

        return createdUser;
    }

    async login(loginDto: LoginDto): Promise<{accessToken: string, currentUser: UserDto}> {
        const user: User | null = await this.usersService.findByEmail(loginDto.email);

        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException("Invalid email or password");
        }

        if (!user.isVerified) {
            throw new UnauthorizedException("Account not verified. Please verify your email.");
        }

        const payload = { sub: user.id, email: user.email };
        const token: string = this.jwtService.sign(payload);

        this.logger.log('Creating user with token ', token);
        return {
            accessToken: token,
            currentUser: plainToInstance(UserDto, user, {
                excludeExtraneousValues: true,
            }),
        }
    }

    async sendVerificationEmail(user: User): Promise<void> {
        const code = this.generate6DigitCode();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        const verification = this.verificationRepository.create({ user, code, expiresAt });
        await this.verificationRepository.save(verification);

        this.logger.log(`Verification code for ${user.email}: ${code}`);
        await this.mailService.sendVerificationCode(user.email, code);
    }

    async verifyCode(verificationCodeDto: VerificationCodeDto): Promise<{ message: string }> {
        const user: User | null  = await this.usersService.findByEmail(verificationCodeDto.email);
        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        const record = await this.verificationRepository.findOne({
            where: { user: { id: user.id }, code: verificationCodeDto.code },
            relations: ["user"]
        });
        if (!record) {
            throw new BadRequestException('Invalid verification code');
        }

        if (record.expiresAt < new Date()) {
            await this.verificationRepository.delete(record.id);
            throw new BadRequestException('Verification code expired');
        }

        user.isVerified = true;
        await this.usersService.save(user);
        await this.verificationRepository.delete(record.id);

        return { message: 'Account verified successfully' };
    }

    private generate6DigitCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
}
