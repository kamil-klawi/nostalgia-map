import { Logger, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { plainToInstance } from "class-transformer";
import * as bcrypt from 'bcrypt';
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDto} from "./dto/login.dto";
import { UserDto } from "../users/dto/user.dto";
import { User } from "../users/entity/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    private readonly logger = new Logger(AuthService.name, { timestamp: true });

    async register(createUserDto: CreateUserDto): Promise<UserDto> {
        this.logger.log('Creating new user', createUserDto);
        return this.usersService.create(createUserDto);
    }

    async login(loginDto: LoginDto): Promise<{accessToken: string, currentUser: UserDto}> {
        const user: User | null = await this.usersService.findByEmail(loginDto.email);

        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException("Invalid email or password");
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
}
